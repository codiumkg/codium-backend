import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(createLectureDto: CreateLectureDto) {
    return this.prismaService.lecture.create({ data: createLectureDto });
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

  complete(lectureId: number, userId: number) {
    return this.prismaService.lectureUserCompleted.create({
      data: { lectureId, userId },
    });
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
