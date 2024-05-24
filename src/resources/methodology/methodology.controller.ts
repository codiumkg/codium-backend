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
import { MethodologyService } from './methodology.service';
import { CreateMethodologyDto } from './dto/create-methodology.dto';
import { UpdateMethodologyDto } from './dto/update-methodology.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';

@Controller('methodology')
export class MethodologyController {
  constructor(private readonly methodologyService: MethodologyService) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createMethodologyDto: CreateMethodologyDto) {
    return this.methodologyService.create(createMethodologyDto);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.methodologyService.findAll();
  }

  @HasRoles(Role.ADMIN, Role.MANAGER, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.methodologyService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMethodologyDto: UpdateMethodologyDto,
  ) {
    return this.methodologyService.update(+id, updateMethodologyDto);
  }

  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.methodologyService.remove(+id);
  }
}
