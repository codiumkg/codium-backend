import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class SectionService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(section: CreateSectionDto) {
    return this.prismaService.section.create({ data: section });
  }

  findAll(offset?: number, limit?: number) {
    return this.prismaService.section.findMany({
      include: { subject: true },
      ...paginationOptions(offset, limit),
    });
  }

  findAllBySubject(subjectId: number, offset?: number, limit?: number) {
    return this.prismaService.section.findMany({
      where: { subjectId },
      include: { subject: true },
      ...paginationOptions(offset, limit),
    });
  }

  findOne(id: number) {
    return this.prismaService.section.findFirst({
      where: { id },
      include: { subject: true },
    });
  }

  update(id: number, section: UpdateSectionDto) {
    return this.prismaService.section.update({ where: { id }, data: section });
  }

  remove(id: number) {
    return this.prismaService.section.delete({ where: { id } });
  }
}
