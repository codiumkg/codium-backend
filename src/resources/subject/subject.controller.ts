import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from 'src/resources/subject/dto/subject.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {
    this.subjectService = subjectService;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSubjects(
    @Query() { offset, limit }: PaginationParams,
    @Query('title') title: string,
  ) {
    return this.subjectService.getSubjects(+offset, +limit, title);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSubjectById(@Param('id') id: string) {
    return this.subjectService.getSubjectById(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createSubject(@Body() subject: CreateSubjectDto) {
    return this.subjectService.createSubject(subject);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateSubject(
    @Param('id') id: string,
    @Body() subject: Partial<CreateSubjectDto>,
  ) {
    return this.subjectService.updateSubject(+id, subject);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteSubject(@Param('id') id: string) {
    return this.subjectService.deleteSubject(+id);
  }
}
