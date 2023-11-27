import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LectureService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(createLectureDto: CreateLectureDto) {
    return this.prismaService.lecture.create({ data: createLectureDto });
  }

  findAll() {
    return this.prismaService.lecture.findMany();
  }

  findAllByTopic(topicId: number) {
    return this.prismaService.lecture.findMany({ where: { topicId } });
  }

  findOne(id: number) {
    return this.prismaService.lecture.findFirst({ where: { id } });
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
