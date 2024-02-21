import { Module } from '@nestjs/common';
import { TopicContentService } from './topic-content.service';
import { TopicContentController } from './topic-content.controller';

@Module({
  controllers: [TopicContentController],
  providers: [TopicContentService],
})
export class TopicContentModule {}
