import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';
import { TopicService } from '../topic/topic.service';
import { User } from '@prisma/client';

@Injectable()
export class SectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly topicService: TopicService,
  ) {
    this.prismaService = prismaService;
  }

  create(section: CreateSectionDto) {
    return this.prismaService.section.create({ data: section });
  }

  findAll(offset?: number, limit?: number, title?: string) {
    return this.prismaService.section.findMany({
      include: { subject: true },
      ...(title && { where: { title } }),
      ...paginationOptions(offset, limit),
    });
  }

  // TODO: progress - completed
  async findAllBySubject({
    subjectId,
    offset,
    limit,
    title,
    user,
  }: {
    subjectId: number;
    offset?: number;
    limit?: number;
    title?: string;
    user: User;
  }) {
    const sections = await this.prismaService.section.findMany({
      where: { subjectId },
      include: { subject: true },
      ...(title && { where: { title } }),
      ...paginationOptions(offset, limit),
    });

    const topics = await this.topicService.findAll({ user });

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
