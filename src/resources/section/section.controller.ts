import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role, User } from '@prisma/client';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IUserData } from '../auth/interfaces/tokenData';
import { SectionFiltersDto } from './dto/section-filters.dto';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('sections')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private readonly jwtService: JwtService,
  ) {}

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Req() req: Request,
    @Query() filtersDto: SectionFiltersDto,
    @GetUser() user: User,
  ) {
    const { authorization } = req.headers;

    const token = authorization.replace('Bearer ', '');

    const userdata: IUserData = this.jwtService.decode(token) as IUserData;

    if (userdata.group && userdata.role === Role.STUDENT) {
      return this.sectionService.findAll(user, {
        subjectId: userdata.group.subjectId,
      });
    }

    return this.sectionService.findAll(user, filtersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(+id, updateSectionDto);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
