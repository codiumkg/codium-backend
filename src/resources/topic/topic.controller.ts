import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role, User } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';
import { TopicContentService } from '../topic-content/topic-content.service';
import { TopicContentOrderDto } from './dto/topic-content-order.dto';
import { GetUser } from 'src/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('topics')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly topicContentService: TopicContentService,
  ) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get()
  findAll(
    @Query('sectionId') sectionId: string,
    @Query() { offset, limit }: PaginationParams,
    @Query('title') title: string,
    @GetUser() user: User,
  ) {
    return this.topicService.findAll({
      offset: +offset,
      limit: +limit,
      sectionId: +sectionId,
      title,
      user,
    });
  }

  @Get(':id/get-content')
  async getContent(@Param('id') id: string, @GetUser() user: User) {
    try {
      return this.topicContentService.findAll({ topicId: +id, user });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Post(':id/update_content_order')
  updateContentOrder(
    @Param('id') id: string,
    @Body() topicContent: TopicContentOrderDto,
  ) {
    return this.topicService.reorderContent(+id, topicContent);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(+id, updateTopicDto);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}
