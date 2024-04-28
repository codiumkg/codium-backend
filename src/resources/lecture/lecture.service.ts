import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';
import { TopicContentType } from '@prisma/client';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(createLectureDto: CreateLectureDto) {
    return this.prismaService.lecture
      .create({ data: createLectureDto })
      .then((lecture) => {
        this.prismaService.topicContent.create({
          data: {
            lectureId: lecture.id,
            type: TopicContentType.LECTURE,
            topicId: lecture.topicId,
          },
        });
      });
  }

  findAll(offset?: number, limit?: number, title?: string) {
    return this.prismaService.lecture.findMany({
      include: { topic: true },
      ...(title && { where: { title } }),
      ...paginationOptions(offset, limit),
    });
  }

  findAllByTopic(
    topicId: number,
    offset?: number,
    limit?: number,
    title?: string,
  ) {
    return this.prismaService.lecture.findMany({
      where: { topicId },
      include: { topic: true },
      ...(title && { where: { title } }),
      ...paginationOptions(offset, limit),
    });
  }

  findOne(id: number) {
    return this.prismaService.lecture.findFirst({
      where: { id },
      include: { topic: true },
    });
  }

  async complete(lectureId: number, userId: number) {
    const completedRecords =
      await this.prismaService.lectureUserCompleted.findMany({
        where: { lectureId, userId },
      });

    if (!completedRecords.length) {
      return this.prismaService.lectureUserCompleted.create({
        data: { lectureId, userId },
      });
    }

    return {
      message: 'Already completed',
    };
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    return this.prismaService.lecture.update({
      where: { id },
      data: updateLectureDto,
    });
  }

  remove(id: number) {
    return this.prismaService.lecture.delete({ where: { id } });
  }
}
