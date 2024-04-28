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
  Req,
  BadRequestException,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';
import { TopicContentService } from '../topic-content/topic-content.service';
import { JwtService } from '@nestjs/jwt';
import { IUserData } from '../auth/interfaces/tokenData';
import { LectureUserCompleteService } from '../lecture-user-complete/lecture-user-complete.service';

@UseGuards(JwtAuthGuard)
@Controller('topics')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly topicContentService: TopicContentService,
    private readonly lectureUserCompletedService: LectureUserCompleteService,
    private readonly jwtService: JwtService,
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
  ) {
    if (sectionId) {
      return this.topicService.findAllBySection(
        +sectionId,
        +offset,
        +limit,
        title,
      );
    }

    return this.topicService.findAll(+offset, +limit, title);
  }

  @Get(':id/get-content')
  async getContent(@Param('id') id: string, @Req() req) {
    const authorization = req.headers['authorization'];

    try {
      const token = authorization.replace('Bearer ', '');

      const user = this.jwtService.decode(token) as IUserData;

      const topicContent = await this.topicContentService.findAll(+id);

      const lectureUserCompleted =
        await this.lectureUserCompletedService.findAll();

      // Add isCompleted field to lectures
      return topicContent.map((content, index) => ({
        ...content,
        orderNumber: index + 1,
        ...(content.type === 'LECTURE' && {
          lecture: {
            ...content.lecture,
            isCompleted: lectureUserCompleted.some(
              (record) =>
                record.lectureId === content.lectureId &&
                record.userId === user.id,
            ),
          },
        }),
      }));
    } catch (e) {
      throw new BadRequestException();
    }
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
