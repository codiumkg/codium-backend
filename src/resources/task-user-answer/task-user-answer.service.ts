import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskUserAnswerDto } from './dto/create-task-user-answer.dto';
import { UpdateTaskUserAnswerDto } from './dto/update-task-user-answer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskUserAnswerService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskUserAnswerDto: CreateTaskUserAnswerDto) {
    return this.prismaService.taskUserAnswer.create({
      data: createTaskUserAnswerDto,
    });
  }

  async findByUser(userId: number) {
    const answers = await this.prismaService.taskUserAnswer.findMany({
      where: { userId },
      include: { answer: true, task: true },
    });

    if (!answers) {
      throw new NotFoundException('Ответы данного пользователя не найдены');
    }

    return answers;
  }

  findByUserAndTaskId(userId: number, taskId: number) {
    return this.prismaService.taskUserAnswer.findFirst({
      where: { userId, taskId },
      include: { answer: true, task: true },
    });
  }

  findAll() {
    return this.prismaService.taskUserAnswer.findMany({
      include: { answer: true, task: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.taskUserAnswer.findFirst({
      where: { id },
      include: { answer: true, task: true },
    });
  }

  update(id: number, updateTaskUserAnswerDto: UpdateTaskUserAnswerDto) {
    return this.prismaService.taskUserAnswer.update({
      where: { id },
      data: updateTaskUserAnswerDto,
    });
  }

  remove(id: number) {
    return this.prismaService.taskUserAnswer.delete({ where: { id } });
  }
}
