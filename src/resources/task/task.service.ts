import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { AnswerService } from '../answer/answer.service';
import { Role, TopicContentType, User } from '@prisma/client';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';
import { TaskFiltersDto } from './dto/task-filters.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly answerService: AnswerService,
    private readonly taskUserAnswerService: TaskUserAnswerService,
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

        await this.prismaService.topicContent.create({
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

  async saveCustomAnswer(id: number, text: string, user: User) {
    const answer = await this.prismaService.taskUserAnswer.findFirst({
      where: { taskId: id, userId: user.id },
    });

    if (answer) {
      return { message: 'Вы уже отвечали на данный вопрос' };
    }

    return this.taskUserAnswerService.create({
      text,
      userId: user.id,
      taskId: id,
    });
  }

  async getCurrentUserAnswer(id: number, user: User) {
    const answer = await this.prismaService.taskUserAnswer.findFirst({
      where: { taskId: id, userId: user.id },
    });

    if (!answer) {
      return { message: 'Ответы текущего пользователя не найдены.' };
    }

    return answer;
  }

  async findAll(user: User, filters?: TaskFiltersDto) {
    const tasks = await this.prismaService.task.findMany({
      include: { answers: true, topic: true },
      ...(Object.keys(filters).length && {
        where: {
          ...(filters.search && { text: { contains: filters.search } }),
          ...(filters.topicId && { topicId: filters.topicId }),
        },
      }),
    });

    if (user.role !== Role.STUDENT) {
      return tasks;
    }

    return tasks.map((task) => {
      delete task.correctAnswerExplanation;

      return {
        ...task,
        answers: task.answers.map((answer) => ({
          ...answer,
          isCorrectAnswer: null,
        })),
      };
    });
  }

  async findOne(id: number, user: User) {
    try {
      const task = await this.prismaService.task.findFirst({
        where: { id },
        include: { answers: true, topic: true },
      });

      if (user.role !== Role.STUDENT) {
        return task;
      }

      delete task.correctAnswerExplanation;

      return {
        ...task,
        answers: task.answers.map((answer) => ({
          ...answer,
          isCorrectAnswer: null,
        })),
      };
    } catch (error) {
      return new BadRequestException(error);
    }
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

    return this.prismaService.task
      .update({
        where: { id },
        data: { ...task, answers: {} },
        include: {
          answers: true,
          topicContent: true,
        },
      })
      .then(async (task) => {
        await this.prismaService.topicContent.update({
          where: { id: task.topicContent.id },
          data: {
            topicId: task.topicId,
          },
        });

        return task;
      })
      .catch((error) => new BadRequestException(error));
  }

  remove(id: number) {
    try {
      return this.prismaService.task.delete({ where: { id } });
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
