import { Injectable } from '@nestjs/common';
import { CreateRegRequestDto } from './dto/create-reg-request.dto';
import { UpdateRegRequestDto } from './dto/update-reg-request.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class RegRequestService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createRegRequestDto: CreateRegRequestDto) {
    return this.prismaService.regRequest.create({ data: createRegRequestDto });
  }

  findAll(offset?: number, limit?: number) {
    return this.prismaService.regRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      ...paginationOptions(offset, limit),
    });
  }

  findOne(id: number) {
    return this.prismaService.regRequest.findFirst({ where: { id } });
  }

  update(id: number, updateRegRequestDto: UpdateRegRequestDto) {
    return this.prismaService.regRequest.update({
      where: { id },
      data: updateRegRequestDto,
    });
  }

  remove(id: number) {
    return this.prismaService.regRequest.delete({ where: { id } });
  }
}
