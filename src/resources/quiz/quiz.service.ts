import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from 'src/resources/quiz/dto/quiz.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class QuizService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getQuizzes(offset?: number, limit?: number) {
    return this.prismaService.quiz.findMany({
      include: { topic: true },
      ...paginationOptions(offset, limit),
    });
  }

  async findAllByTopic(topicId: number, offset?: number, limit?: number) {
    return this.prismaService.quiz.findMany({
      where: { topicId },
      include: { topic: true },
      ...paginationOptions(offset, limit),
    });
  }

  async getQuizById(id: number) {
    return this.prismaService.quiz.findFirst({
      where: { id },
      include: { questions: { include: { answers: true } }, topic: true },
    });
  }

  async createQuiz(quiz: CreateQuizDto) {
    return this.prismaService.quiz.create({ data: quiz });
  }

  async updateQuiz(id: number, quiz: Partial<CreateQuizDto>) {
    return this.prismaService.quiz.update({ where: { id }, data: quiz });
  }

  async deleteQuiz(id: number) {
    return this.prismaService.quiz.delete({ where: { id } });
  }
}
