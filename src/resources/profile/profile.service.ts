import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from 'src/dtos/profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async getProfiles() {
    return this.prismaService.profile.findMany();
  }

  async getProfileById(id: number) {
    return this.prismaService.profile.findFirst({ where: { id } });
  }

  async createProfile(profile: CreateProfileDto) {
    return this.prismaService.profile.create({ data: profile });
  }

  async updateProfile(id: number, profile: Partial<CreateProfileDto>) {
    return this.prismaService.profile.update({ where: { id }, data: profile });
  }

  async deleteProfile(id: number) {
    return this.prismaService.profile.delete({ where: { id } });
  }
}
