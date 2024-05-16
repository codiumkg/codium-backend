import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TopicContentService } from './topic-content.service';
import { CreateTopicContentDto } from './dto/create-topic-content.dto';
import { UpdateTopicContentDto } from './dto/update-topic-content.dto';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role, User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('topic-content')
export class TopicContentController {
  constructor(private readonly topicContentService: TopicContentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN, Role.MANAGER)
  @Post()
  create(@Body() createTopicContentDto: CreateTopicContentDto) {
    return this.topicContentService.create(createTopicContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@GetUser() user: User) {
    return this.topicContentService.findAll({ user });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicContentService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicContentDto: UpdateTopicContentDto,
  ) {
    return this.topicContentService.update(+id, updateTopicContentDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicContentService.remove(+id);
  }
}
