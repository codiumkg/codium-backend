import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from 'src/prisma.service';
import { paginationOptions } from 'src/constants/transactionOptions';
import { TopicContentOrderDto } from './dto/topic-content-order.dto';

@Injectable()
export class TopicService {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  create(createTopicDto: CreateTopicDto) {
    return this.prismaService.topic.create({ data: createTopicDto });
  }

  findAll(offset?: number, limit?: number, title?: string) {
    return this.prismaService.topic.findMany({
      include: { section: true },
      ...(title && { where: { title } }),
      ...paginationOptions(offset, limit),
    });
  }

  findAllBySection(
    sectionId: number,
    offset?: number,
    limit?: number,
    title?: string,
  ) {
    return this.prismaService.topic.findMany({
      where: { sectionId },
      include: { section: true },
      ...(title && { where: { title } }),
      ...paginationOptions(offset, limit),
    });
  }

  findOne(id: number) {
    return this.prismaService.topic.findFirst({
      include: { section: true },
      where: { id },
    });
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

  async reorderContent(id: number, data: TopicContentOrderDto) {
    data.topicContentIds.map(
      async (id, index) =>
        await this.prismaService.topicContent.update({
          where: { id },
          data: {
            orderNumber: ++index,
          },
        }),
    );

    return this.prismaService.topicContent.findMany({ where: { topicId: id } });
  }
}
