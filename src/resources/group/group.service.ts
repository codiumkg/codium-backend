import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';
import { Role } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {
    this.prismaService = prismaService;
  }

  create(createGroupDto: CreateGroupDto) {
    return this.prismaService.group.create({ data: createGroupDto });
  }

  findAll({
    offset,
    limit,
    title,
    teacherId,
  }: {
    offset?: number;
    limit?: number;
    title?: string;
    teacherId?: number;
  }) {
    return this.prismaService.group.findMany({
      include: { subject: true, teacher: true },
      where: {
        ...(title && { title }),
        ...(teacherId && { teacherId }),
      },
      ...paginationOptions(offset, limit),
    });
  }

  findByUser(username: string, offset?: number, limit?: number) {
    return this.prismaService.group.findFirst({
      include: { subject: true, teacher: true },
      where: { users: { some: { username } } },
      ...paginationOptions(offset, limit),
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
      role: Role.STUDENT,
      groupId,
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
