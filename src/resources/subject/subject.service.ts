import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from 'src/resources/subject/dto/subject.dto';
import { PrismaService } from 'src/prisma.service';
import { SubjectFiltersDto } from './dto/subject-filters.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getSubjects(filters?: SubjectFiltersDto) {
    return this.prismaService.subject.findMany({
      ...(Object.keys(filters).length && {
        where: {
          ...(filters.search && {
            title: { contains: filters.search, mode: 'insensitive' },
          }),
        },
      }),
    });
  }

  async getSubjectById(id: number) {
    return this.prismaService.subject.findFirst({
      where: { id },
    });
  }

  async createSubject(subject: CreateSubjectDto) {
    return this.prismaService.subject.create({ data: subject });
  }

  async updateSubject(id: number, subject: Partial<CreateSubjectDto>) {
    return this.prismaService.subject.update({ where: { id }, data: subject });
  }

  async deleteSubject(id: number) {
    return this.prismaService.subject.delete({ where: { id } });
  }
}
