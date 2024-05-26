import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from 'src/prisma.service';
import { TopicContentType } from '@prisma/client';
import { LectureFiltersDto } from './dto/lecture-filters.dto';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLectureDto: CreateLectureDto) {
    return this.prismaService.lecture
      .create({ data: createLectureDto })
      .then(async (lecture) => {
        const topicContentCount = await this.prismaService.topicContent.count({
          where: { topicId: lecture.topicId },
        });

        await this.prismaService.topicContent.create({
          data: {
            lectureId: lecture.id,
            type: TopicContentType.LECTURE,
            topicId: lecture.topicId,
            orderNumber: topicContentCount + 1,
          },
        });

        return lecture;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  findAll(filters?: LectureFiltersDto) {
    return this.prismaService.lecture.findMany({
      include: { topic: true },
      ...(Object.keys(filters).length && {
        where: {
          ...(filters.search && {
            OR: [
              { title: { contains: filters.search } },
              { content: { contains: filters.search } },
            ],
          }),
          ...(filters.topicId && { topicId: filters.topicId }),
        },
      }),
    });
  }

  async findOne(id: number) {
    const lecture = await this.prismaService.lecture.findFirst({
      where: { id },
      include: { topic: true },
    });

    if (!lecture) {
      throw new NotFoundException('Lecture not found');
    }

    return lecture;
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

  async update(id: number, updateLectureDto: UpdateLectureDto) {
    try {
      return this.prismaService.lecture
        .update({
          where: { id },
          data: updateLectureDto,
          include: {
            topicContent: true,
          },
        })
        .then(async (lecture) => {
          await this.prismaService.topicContent.update({
            where: { id: lecture.topicContent.id },
            data: {
              topicId: lecture.topicId,
            },
          });

          return lecture;
        })
        .catch((error) => new BadRequestException(error));
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  remove(id: number) {
    try {
      return this.prismaService.lecture.delete({ where: { id } });
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
