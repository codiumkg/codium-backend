import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from 'src/resources/profile/dto/profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findAll() {
    return this.prismaService.profile.findMany();
  }

  async findByUser(username: string) {
    return this.prismaService.profile.findFirst({
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
