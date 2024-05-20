import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TopicContentType, User } from '@prisma/client';
import { CreateUserDto } from 'src/resources/user/dto/user.dto';
import { paginationOptions } from 'src/constants/transactionOptions';
import { TopicService } from '../topic/topic.service';
import { TopicContentService } from '../topic-content/topic-content.service';
import { GroupService } from '../group/group.service';
import { SectionService } from '../section/section.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly topicService: TopicService,
    private readonly topicContentService: TopicContentService,
    private readonly groupService: GroupService,
    private readonly sectionService: SectionService,
  ) {
    this.prismaService = prismaService;
  }

  async getUsers(offset?: number, limit?: number) {
    try {
      const users = await this.prismaService.user.findMany({
        ...paginationOptions(offset, limit),
        include: { profile: true },
      });

      return users.map((user) => {
        delete user.password;

        return user;
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getUserByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
      include: { group: { include: { subject: true } }, profile: true },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: { id },
      include: { profile: true },
    });
  }

  async getProgress(user: User) {
    const group = await this.groupService.findOne(user.groupId);

    const sections = await this.sectionService.findAllBySubject({
      subjectId: group.subjectId,
      user,
    });

    const topicsBySection = await Promise.all(
      sections.map((section) =>
        this.topicService.findAll({ user, sectionId: section.id }),
      ),
    );

    const topics = topicsBySection.reduce((acc, val) => acc.concat(val), []);

    const topicContentsByTopic = await Promise.all(
      topics.map((topic) =>
        this.topicContentService.findAll({ user, topicId: topic.id }),
      ),
    );

    const topicContents = topicContentsByTopic.reduce(
      (acc, val) => acc.concat(val),
      [],
    );

    const completedLecturesLength = topicContents.filter(
      (content) =>
        content.type === TopicContentType.LECTURE &&
        content.lecture.isCompleted,
    ).length;

    const completedTopicsLength = topicContents.filter(
      (content) =>
        content.type === TopicContentType.TASK && content.task.isCompleted,
    ).length;

    const percent =
      ((completedLecturesLength + completedTopicsLength) /
        topicContents.length) *
      100;

    return {
      percent: Math.round(percent),
    };
  }

  async createUser(user: CreateUserDto) {
    const password = bcrypt.hashSync('codium123', 12);

    const newUser = await this.prismaService.user.create({
      data: {
        username: user.username,
        password,
        email: user.email,
        groupId: user.groupId,
        role: user.role,
      },
    });

    await this.prismaService.profile.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        image: user.image,
        userId: newUser.id,
        age: user.age,
      },
    });

    return newUser;
  }

  generatePassword(length: number) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');
  }

  async updateUser(id: number, user: Partial<CreateUserDto>) {
    const updatedUser = await this.prismaService.user.update({
      where: { id: +id },
      data: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        groupId: user.groupId,
      },
    });

    await this.prismaService.profile.update({
      where: {
        userId: +updatedUser.id,
      },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        image: user.image,
        age: user.age,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: number): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
