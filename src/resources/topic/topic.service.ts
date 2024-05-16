import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';
import { TopicContentOrderDto } from './dto/topic-content-order.dto';
import { TopicContentService } from '../topic-content/topic-content.service';
import { TopicContentType, User } from '@prisma/client';

@Injectable()
export class TopicService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly topicContentService: TopicContentService,
  ) {
    this.prismaService = prismaService;
  }

  create(createTopicDto: CreateTopicDto) {
    return this.prismaService.topic.create({ data: createTopicDto });
  }

  async findAll({
    sectionId,
    offset,
    limit,
    title,
    user,
  }: {
    sectionId?: number;
    offset?: number;
    limit?: number;
    title?: string;
    user: User;
  }) {
    const [topics, topicContents] = await Promise.all([
      this.prismaService.topic.findMany({
        ...(sectionId && { where: { sectionId } }),
        include: { section: true },
        ...(title && { where: { title } }),
        ...paginationOptions(offset, limit),
      }),
      this.topicContentService.findAll({ user }),
    ]);

    return topics.map((topic) => {
      const currentTopicContents = topicContents.filter(
        (content) => content.topicId === topic.id,
      );

      const toComplete = currentTopicContents.length;

      const lecturesCompleted = currentTopicContents.filter(
        (content) =>
          content.type === TopicContentType.LECTURE &&
          content.lecture.isCompleted,
      ).length;

      const tasksCompleted = currentTopicContents.filter(
        (content) =>
          content.type === TopicContentType.TASK && content.task.isCompleted,
      ).length;

      return {
        ...topic,
        progress: {
          completed: lecturesCompleted + tasksCompleted,
          toComplete,
        },
      };
    });
  }

  findOne(id: number) {
    return this.prismaService.topic.findFirst({
      include: { section: true },
      where: { id },
    });
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return this.prismaService.topic.update({
      where: { id },
      data: updateTopicDto,
    });
  }

  remove(id: number) {
    return this.prismaService.topic.delete({ where: { id } });
  }

  async reorderContent(id: number, data: TopicContentOrderDto) {
    if (!data) throw new BadRequestException('No topic content ids provided');

    data.topicContentIds.map(
      async (id, index) =>
        await this.prismaService.topicContent.update({
          where: { id },
          data: {
            orderNumber: ++index,
          },
        }),
    );

    return this.prismaService.topicContent.findMany({ where: { topicId: id } });
  }
}
