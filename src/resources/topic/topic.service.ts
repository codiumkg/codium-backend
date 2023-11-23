import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(createTopicDto: CreateTopicDto) {
    return this.prismaService.topic.create({ data: createTopicDto });
  }

  findAll() {
    return this.prismaService.topic.findMany();
  }

  findOne(id: number) {
    return this.prismaService.topic.findFirst({ where: { id } });
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return this.prismaService.topic.update({
      where: { id },
      data: updateTopicDto,
    });
  }

  remove(id: number) {
    return this.prismaService.topic.delete({ where: { id } });
  }
}
