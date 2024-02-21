import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopicContentService } from './topic-content.service';
import { CreateTopicContentDto } from './dto/create-topic-content.dto';
import { UpdateTopicContentDto } from './dto/update-topic-content.dto';

@Controller('topic-content')
export class TopicContentController {
  constructor(private readonly topicContentService: TopicContentService) {}

  @Post()
  create(@Body() createTopicContentDto: CreateTopicContentDto) {
    return this.topicContentService.create(createTopicContentDto);
  }

  @Get()
  findAll() {
    return this.topicContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicContentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicContentDto: UpdateTopicContentDto,
  ) {
    return this.topicContentService.update(+id, updateTopicContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicContentService.remove(+id);
  }
}
