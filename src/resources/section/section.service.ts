import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma.service';
import { TopicService } from '../topic/topic.service';
import { User } from '@prisma/client';
import { SectionFiltersDto } from './dto/section-filters.dto';

@Injectable()
export class SectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly topicService: TopicService,
  ) {}

  create(section: CreateSectionDto) {
    return this.prismaService.section.create({ data: section });
  }

  async findAll(filters?: SectionFiltersDto, user?: User) {
    const sections = await this.prismaService.section.findMany({
      include: { subject: true },
      ...(Object.keys(filters!).length && {
        where: {
          ...(filters.search && {
            title: { contains: filters.search, mode: 'insensitive' },
          }),
          ...(filters.subjectId && { subjectId: filters.subjectId }),
        },
      }),
    });

    const topics = await this.topicService.findAll(user);

    return sections.map((section) => {
      const currentSectionTopics = topics.filter(
        (topic) => topic.sectionId === section.id,
      );

      const toComplete = currentSectionTopics.length;

      const completed = currentSectionTopics.filter(
        (topic) => topic.progress.completed === topic.progress.toComplete,
      ).length;

      return {
        ...section,
        progress: {
          completed,
          toComplete,
        },
      };
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
