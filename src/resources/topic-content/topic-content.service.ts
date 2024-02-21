import { Injectable } from '@nestjs/common';
import { CreateTopicContentDto } from './dto/create-topic-content.dto';
import { UpdateTopicContentDto } from './dto/update-topic-content.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TopicContentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTopicContentDto: CreateTopicContentDto) {
    return this.prismaService.topicContent.create({
      data: createTopicContentDto,
    });
  }

  findAll(topicId?: number) {
    return this.prismaService.topicContent.findMany({
      ...(topicId && { where: { id: topicId } }),
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} topicContent`;
  }

  update(id: number, updateTopicContentDto: UpdateTopicContentDto) {
    return this.prismaService.topicContent.update({
      where: { id },
      data: updateTopicContentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.topicContent.delete({ where: { id } });
  }
}
