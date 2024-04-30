import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LectureUserCompleteService } from './lecture-user-complete.service';
import { CreateLectureUserCompleteDto } from './dto/create-lecture-user-complete.dto';
import { UpdateLectureUserCompleteDto } from './dto/update-lecture-user-complete.dto';

@Controller('lecture-user-complete')
export class LectureUserCompleteController {
  constructor(
    private readonly lectureUserCompleteService: LectureUserCompleteService,
  ) {}

  @Post()
  create(@Body() createLectureUserCompleteDto: CreateLectureUserCompleteDto) {
    return this.lectureUserCompleteService.create(createLectureUserCompleteDto);
  }

  @Get()
  findAll() {
    return this.lectureUserCompleteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureUserCompleteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLectureUserCompleteDto: UpdateLectureUserCompleteDto,
  ) {
    return this.lectureUserCompleteService.update(
      +id,
      updateLectureUserCompleteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectureUserCompleteService.remove(+id);
  }
}
