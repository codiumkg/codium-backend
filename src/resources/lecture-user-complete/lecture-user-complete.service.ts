import { Injectable } from '@nestjs/common';
import { CreateLectureUserCompleteDto } from './dto/create-lecture-user-complete.dto';
import { UpdateLectureUserCompleteDto } from './dto/update-lecture-user-complete.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LectureUserCompleteService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createLectureUserCompleteDto: CreateLectureUserCompleteDto) {
    return this.prismaService.lectureUserCompleted.create({
      data: createLectureUserCompleteDto,
    });
  }

  findAll() {
    return this.prismaService.lectureUserCompleted.findMany();
  }

  findOne(id: number) {
    return this.prismaService.lectureUserCompleted.findFirst({ where: { id } });
  }

  update(
    id: number,
    updateLectureUserCompleteDto: UpdateLectureUserCompleteDto,
  ) {
    return this.prismaService.lectureUserCompleted.update({
      where: { id },
      data: updateLectureUserCompleteDto,
    });
  }

  remove(id: number) {
    return this.prismaService.lectureUserCompleted.delete({ where: { id } });
  }
}
