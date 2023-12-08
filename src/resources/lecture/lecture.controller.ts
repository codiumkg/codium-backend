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
} from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';

@UseGuards(JwtAuthGuard)
@Controller('lectures')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.create(createLectureDto);
  }

  @Get()
  findAll(
    @Query('topicId') topicId: string,
    @Query() { offset, limit }: PaginationParams,
  ) {
    if (topicId) {
      return this.lectureService.findAllByTopic(+topicId, +offset, +limit);
    }
    return this.lectureService.findAll(+offset, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    return this.lectureService.update(+id, updateLectureDto);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureService.remove(+id);
  }
}
