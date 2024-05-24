import { Injectable } from '@nestjs/common';
import { CreateMethodologyDto } from './dto/create-methodology.dto';
import { UpdateMethodologyDto } from './dto/update-methodology.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MethodologyService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createMethodologyDto: CreateMethodologyDto) {
    return this.prismaService.methodology.create({
      data: createMethodologyDto,
    });
  }

  findAll() {
    return this.prismaService.methodology.findMany({
      include: { topic: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.methodology.findFirst({
      where: { id },
      include: { topic: true },
    });
  }

  update(id: number, updateMethodologyDto: UpdateMethodologyDto) {
    return this.prismaService.methodology.update({
      where: { id },
      data: updateMethodologyDto,
      include: { topic: true },
    });
  }

  remove(id: number) {
    return this.prismaService.methodology.delete({ where: { id } });
  }
}
