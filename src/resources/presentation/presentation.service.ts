import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { PrismaService } from 'src/prisma.service';
import { PresentationFiltersDto } from './dto/presentation-filters.dto';

@Injectable()
export class PresentationService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPresentationDto: CreatePresentationDto) {
    return this.prismaService.presentation.create({
      data: createPresentationDto,
    });
  }

  findAll(filters?: PresentationFiltersDto) {
    return this.prismaService.presentation.findMany({
      include: { topic: true },
      where: {
        ...(filters?.topicId && { topicId: filters.topicId }),
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.presentation.findFirst({
      where: { id },
      include: { topic: true },
    });
  }

  update(id: number, updatePresentationDto: UpdatePresentationDto) {
    return this.prismaService.presentation.update({
      where: { id },
      data: updatePresentationDto,
      include: { topic: true },
    });
  }

  remove(id: number) {
    return this.prismaService.presentation.delete({ where: { id } });
  }
}
