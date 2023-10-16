import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(answer: CreateAnswerDto) {
    return this.prismaService.answer.create({ data: answer });
  }

  findAll() {
    return this.prismaService.answer.findMany();
  }

  findOne(id: number) {
    return this.prismaService.answer.findFirst({ where: { id } });
  }

  update(id: number, answer: UpdateAnswerDto) {
    return this.prismaService.answer.update({ where: { id }, data: answer });
  }

  remove(id: number) {
    return this.prismaService.answer.delete({ where: { id } });
  }
}
