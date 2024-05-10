import { Injectable } from '@nestjs/common';
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

  findByUser(userId: number) {
    return this.prismaService.taskUserAnswer.findMany({ where: { userId } });
  }

  findByUserAndTaskId(userId: number, taskId: number) {
    return this.prismaService.taskUserAnswer.findFirst({
      where: { userId, taskId },
      include: { answer: true },
    });
  }

  findAll() {
    return this.prismaService.taskUserAnswer.findMany();
  }

  findOne(id: number) {
    return this.prismaService.taskUserAnswer.findFirst({ where: { id } });
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
