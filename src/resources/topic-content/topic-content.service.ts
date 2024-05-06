import { BadRequestException, Injectable } from '@nestjs/common';
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
      ...(topicId && { where: { topicId } }),
      orderBy: { orderNumber: 'asc' },
      include: {
        topic: true,
        lecture: true,
        task: { include: { answers: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.topicContent.findFirst({
      where: { id },
      include: {
        topic: true,
        lecture: true,
        task: { include: { answers: true } },
      },
    });
  }

  update(id: number, updateTopicContentDto: UpdateTopicContentDto) {
    return this.prismaService.topicContent.update({
      where: { id },
      data: updateTopicContentDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.topicContent
      .delete({ where: { id } })
      .catch((error) => new BadRequestException(error));
  }
}
