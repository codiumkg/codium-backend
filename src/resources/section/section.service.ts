import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SectionService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(section: CreateSectionDto) {
    return this.prismaService.section.create({ data: section });
  }

  findAll() {
    return this.prismaService.section.findMany();
  }

  findAllBySubject(subjectId: number) {
    return this.prismaService.section.findMany({
      where: { subjectId },
    });
  }

  findOne(id: number) {
    return this.prismaService.section.findFirst({
      where: { id },
    });
  }

  update(id: number, section: UpdateSectionDto) {
    return this.prismaService.section.update({ where: { id }, data: section });
  }

  remove(id: number) {
    return this.prismaService.section.delete({ where: { id } });
  }
}
