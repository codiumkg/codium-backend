import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from 'src/resources/quiz/dto/quiz.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuizService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getQuizzes() {
    return this.prismaService.quiz.findMany();
  }

  async findAllByTopic(topicId: number) {
    return this.prismaService.quiz.findMany({ where: { topicId } });
  }

  async getQuizById(id: number) {
    return this.prismaService.quiz.findFirst({
      where: { id },
      include: { questions: { include: { answers: true } } },
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
