import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(task: CreateTaskDto) {
    return this.prismaService.task.create({
      data: {
        ...task,
        answers: {
          createMany: {
            data: task.answers,
          },
        },
      },
    });
  }

  findAll(offset?: number, limit?: number) {
    return this.prismaService.task.findMany({
      include: { answers: true, topic: true },
      ...paginationOptions(offset, limit),
    });
  }

  findOne(id: number) {
    return this.prismaService.task.findFirst({
      where: { id },
      include: { answers: true, topic: true },
    });
  }

  update(id: number, task: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data: {
        ...task,
        answers: {
          updateMany: {
            where: {
              taskId: id,
            },
            data: task.answers,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
