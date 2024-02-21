import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaService } from 'src/prisma.service';
import { TopicContentService } from '../topic-content/topic-content.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, TopicContentService, PrismaService],
})
export class TopicModule {}
