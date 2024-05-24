import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PresentationService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPresentationDto: CreatePresentationDto) {
    return this.prismaService.presentation.create({
      data: createPresentationDto,
    });
  }

  findAll() {
    return this.prismaService.presentation.findMany({
      include: { topic: true },
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
