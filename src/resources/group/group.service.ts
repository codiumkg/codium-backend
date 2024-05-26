import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { GroupFilterDto } from './dto/group-filters.dto';

@Injectable()
export class GroupService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return this.prismaService.group.create({ data: createGroupDto });
  }

  findAll(filters?: GroupFilterDto) {
    return this.prismaService.group.findMany({
      include: {
        subject: true,
        teacher: true,
        _count: {
          select: {
            users: true,
          },
        },
      },
      ...(Object.keys(filters).length && {
        where: {
          ...(filters.teacherId && { teacherId: filters.teacherId }),
          ...(filters.username && {
            users: { some: { username: filters.username } },
          }),
          ...(filters.search && { title: { contains: filters.search } }),
        },
      }),
    });
  }

  findOne(id: number) {
    return this.prismaService.group.findFirst({
      where: { id },
      include: { subject: true, teacher: true },
    });
  }

  async getGroupStudents(groupId: number) {
    const students = await this.userService.getUsers({
      groupId,
      role: 'STUDENT',
    });

    return {
      studentsCount: students.length,
      students,
    };
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prismaService.group.update({
      where: { id },
      data: updateGroupDto,
    });
  }

  remove(id: number) {
    return this.prismaService.group.delete({ where: { id } });
  }
}
