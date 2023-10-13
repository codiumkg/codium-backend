import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from 'src/dtos/subject.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';

@Controller('api/subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {
    this.subjectService = subjectService;
  }

  @Get()
  async getSubjects() {
    return this.subjectService.getSubjects();
  }

  @Get(':id')
  async getSubjectById(@Param('id') id: number) {
    return this.subjectService.getSubjectById(id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createSubject(@Body() subject: CreateSubjectDto) {
    return this.subjectService.createSubject(subject);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateSubject(
    @Param() id: number,
    @Body() subject: Partial<CreateSubjectDto>,
  ) {
    return this.subjectService.updateSubject(id, subject);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteSubject(@Param() id: number) {
    return this.subjectService.deleteSubject(id);
  }
}
