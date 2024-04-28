import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';
import { AnswerService } from '../answer/answer.service';
import { TopicContentType } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly answerService: AnswerService,
  ) {
    this.prismaService = prismaService;
  }

  async create(task: CreateTaskDto) {
    return this.prismaService.task
      .create({
        data: {
          ...task,
          answers: {
            createMany: {
              data: task.answers,
            },
          },
        },
      })
      .then(async (task) => {
        const topicContentCount = await this.prismaService.topicContent.count({
          where: { topicId: task.topicId },
        });

        this.prismaService.topicContent.create({
          data: {
            taskId: task.id,
            type: TopicContentType.TASK,
            topicId: task.topicId,
            orderNumber: topicContentCount + 1,
          },
        });

        return task;
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
    const answers = await this.prismaService.answer.findMany({
      where: { taskId: id },
    });

    const answerIdsToUpdate = answers.map((answer) => answer.id);

    for (const answer of task.answers) {
      const answerIndex = answerIdsToUpdate.indexOf(answer.id);

      if (answerIndex !== -1) {
        await this.answerService.update(answerIdsToUpdate[answerIndex], answer);
      } else {
        await this.answerService.create({ ...answer, taskId: id });
      }
    }

    return this.prismaService.task.update({
      where: { id },
      data: { ...task, answers: {} },
      include: { answers: true },
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
