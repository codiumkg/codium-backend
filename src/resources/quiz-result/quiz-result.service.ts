import { Injectable } from '@nestjs/common';
import { CreateQuizResultDto } from 'src/resources/quiz-result/dto/quiz-result.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuizResultService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getAll({ quizId, userId }: { quizId?: number; userId?: number }) {
    return this.prismaService.quizResult.findMany({
      where: { quizId, userId },
    });
  }

  async getById(id: number) {
    return this.prismaService.quizResult.findFirst({
      where: { id },
      include: { quiz: true, user: true },
    });
  }

  async create(quizResult: CreateQuizResultDto) {
    return this.prismaService.quizResult.create({ data: quizResult });
  }

  async update(id: number, quizResult: Partial<CreateQuizResultDto>) {
    return this.prismaService.quizResult.update({
      where: { id },
      data: quizResult,
    });
  }

  async delete(id: number) {
    return this.prismaService.quizResult.delete({ where: { id } });
  }
}
