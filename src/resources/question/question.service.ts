import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(question: CreateQuestionDto) {
    return this.prismaService.question.create({ data: question });
  }

  findAll(offset?: number, limit?: number) {
    return this.prismaService.question.findMany({
      include: { answers: true, quiz: true },
      ...paginationOptions(offset, limit),
    });
  }

  findOne(id: number) {
    return this.prismaService.question.findFirst({
      where: { id },
      include: { answers: true, quiz: true },
    });
  }

  update(id: number, question: UpdateQuestionDto) {
    return this.prismaService.question.update({
      where: { id },
      data: question,
    });
  }

  remove(id: number) {
    return this.prismaService.question.delete({ where: { id } });
  }
}
