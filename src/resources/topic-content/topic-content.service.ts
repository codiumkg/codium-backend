import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopicContentDto } from './dto/create-topic-content.dto';
import { UpdateTopicContentDto } from './dto/update-topic-content.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { LectureUserCompleteService } from '../lecture-user-complete/lecture-user-complete.service';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';

@Injectable()
export class TopicContentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly lectureUserCompletedService: LectureUserCompleteService,
    private readonly taskUserAnswerService: TaskUserAnswerService,
  ) {}

  create(createTopicContentDto: CreateTopicContentDto) {
    return this.prismaService.topicContent.create({
      data: createTopicContentDto,
    });
  }

  async findAll({ topicId, user }: { topicId?: number; user: User }) {
    const topicContent = await this.prismaService.topicContent.findMany({
      ...(topicId && { where: { topicId } }),
      orderBy: { orderNumber: 'asc' },
      include: {
        topic: true,
        lecture: {
          include: {
            topic: true,
          },
        },
        task: { include: { answers: true, topic: true } },
      },
    });

    const [lectureUserCompleted, taskUserAnswer] = await Promise.all([
      this.lectureUserCompletedService.findAll(),
      this.taskUserAnswerService.findByUser(user.id),
    ]);

    // Add isCompleted field to lectures and tasks
    // Renew order number to start from 1 even if it's different in the database
    // It is made for cases when topic content is deleted, but the order number remains
    // It would not make sense to show order nubmers like = [4, 6, 7, 8, 9...], but = [1, 2, 3, 4, 5, 6...]
    return topicContent.map((content, index) => ({
      ...content,
      orderNumber: index + 1,
      ...(content.type === 'LECTURE' && {
        lecture: {
          ...content.lecture,
          isCompleted: lectureUserCompleted.some(
            (record) =>
              record.lectureId === content.lectureId &&
              record.userId === user.id,
          ),
        },
      }),
      ...(content.type === 'TASK' && {
        task: {
          ...content.task,
          correctAnswerExplanation: taskUserAnswer
            ? content.task.correctAnswerExplanation
            : null,
          isCompleted: taskUserAnswer.some(
            (answer) => answer.taskId === content.taskId,
          ),
          userAnswer: taskUserAnswer.find(
            (answer) => answer.taskId === content.taskId,
          ),
          answers: content.task.answers.map((answer) => ({
            ...answer,
            isCorrectAnswer: !!taskUserAnswer ? answer.isCorrectAnswer : null,
          })),
        },
      }),
    }));
  }

  findOne(id: number) {
    return this.prismaService.topicContent.findFirst({
      where: { id },
      include: {
        topic: true,
        lecture: true,
        task: { include: { answers: true } },
      },
    });
  }

  update(id: number, updateTopicContentDto: UpdateTopicContentDto) {
    return this.prismaService.topicContent.update({
      where: { id },
      data: updateTopicContentDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.topicContent
      .delete({ where: { id } })
      .catch((error) => new BadRequestException(error));
  }
}
