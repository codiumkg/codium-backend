import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(content: CreateContentDto) {
    return this.prismaService.content.create({ data: content });
  }

  findAll() {
    return this.prismaService.content.findMany();
  }

  findOne(id: number) {
    return this.prismaService.content.findFirst({ where: { id } });
  }

  update(id: number, content: UpdateContentDto) {
    return this.prismaService.content.update({ where: { id }, data: content });
  }

  remove(id: number) {
    return this.prismaService.content.delete({ where: { id } });
  }
}
