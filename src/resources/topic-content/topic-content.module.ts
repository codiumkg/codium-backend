import { Module } from '@nestjs/common';
import { TopicContentService } from './topic-content.service';
import { TopicContentController } from './topic-content.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TopicContentController],
  providers: [TopicContentService, PrismaService],
})
export class TopicContentModule {}
