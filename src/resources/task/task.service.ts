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

  async update(id: number, task: UpdateTaskDto) {
    task.answers.map(async (answer) =>
      !answer.id
        ? await this.prismaService.answer.create({
            data: { ...answer, taskId: id },
          })
        : await this.prismaService.answer.update({
            where: { id: answer.id },
            data: { ...answer, taskId: id },
          }),
    );

    return this.prismaService.task.update({
      where: { id },
      data: {
        ...task,
        answers: {},
      },
      include: {
        answers: true,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
