import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from 'src/resources/profile/dto/profile.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(offset?: number, limit?: number) {
    return this.prismaService.profile.findMany({
      include: { user: true },
      ...paginationOptions(offset, limit),
    });
  }

  async findByUser(username: string) {
    return this.prismaService.profile.findFirst({
      include: { user: true },
      where: { user: { username } },
    });
  }

  async findOne(id: number) {
    return this.prismaService.profile.findFirst({
      where: { id },
      include: { user: true },
    });
  }

  async create(profile: CreateProfileDto) {
    return this.prismaService.profile.create({ data: profile });
  }

  async update(id: number, profile: Partial<CreateProfileDto>) {
    return this.prismaService.profile.update({ where: { id }, data: profile });
  }

  async remove(id: number) {
    return this.prismaService.profile.delete({ where: { id } });
  }
}
