import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaService } from 'src/prisma.service';
import { TopicContentModule } from '../topic-content/topic-content.module';

@Module({
  imports: [TopicContentModule],
  controllers: [TopicController],
  providers: [TopicService, PrismaService],
  exports: [TopicService],
})
export class TopicModule {}
