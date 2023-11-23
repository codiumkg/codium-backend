import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(createGroupDto: CreateGroupDto) {
    return this.prismaService.group.create({ data: createGroupDto });
  }

  findAll() {
    return this.prismaService.group.findMany();
  }

  findOne(id: number) {
    return this.prismaService.group.findFirst({ where: { id } });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.prismaService.group.update({
      where: { id },
      data: updateGroupDto,
    });
  }

  remove(id: number) {
    return this.prismaService.group.delete({ where: { id } });
  }
}
