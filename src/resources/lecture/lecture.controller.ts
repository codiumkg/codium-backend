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
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { IUserData } from '../auth/interfaces/tokenData';
import { LectureFiltersDto } from './dto/lecture-filters.dto';

@UseGuards(JwtAuthGuard)
@Controller('lectures')
export class LectureController {
  constructor(
    private readonly lectureService: LectureService,
    private readonly jwtService: JwtService,
  ) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.create(createLectureDto);
  }

  @Get()
  findAll(@Query() filtersDto: LectureFiltersDto) {
    return this.lectureService.findAll(filtersDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectureService.findOne(+id);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string, @Req() req: Request) {
    const authorization = req.headers['authorization'];

    try {
      const token = authorization.replace('Bearer ', '');

      const user = this.jwtService.decode(token) as IUserData;

      return this.lectureService.complete(+id, user?.id);
    } catch (e) {
      throw new BadRequestException('Could not complete the task');
    }
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
