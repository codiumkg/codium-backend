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
import { RegRequestService } from './reg-request.service';
import { CreateRegRequestDto } from './dto/create-reg-request.dto';
import { UpdateRegRequestDto } from './dto/update-reg-request.dto';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import PaginationParams from 'src/interfaces/paginationParams';

@Controller('reg-requests')
export class RegRequestController {
  constructor(private readonly regRequestService: RegRequestService) {}

  @Post()
  create(@Body() createRegRequestDto: CreateRegRequestDto) {
    return this.regRequestService.create(createRegRequestDto);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(@Query() { offset, limit }: PaginationParams) {
    return this.regRequestService.findAll(+offset, +limit);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regRequestService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegRequestDto: UpdateRegRequestDto,
  ) {
    return this.regRequestService.update(+id, updateRegRequestDto);
  }

  check(@Param('id') id: string) {
    return this.regRequestService.check(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regRequestService.remove(+id);
  }
}
