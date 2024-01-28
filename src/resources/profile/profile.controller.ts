import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { CreateProfileDto } from 'src/resources/profile/dto/profile.dto';
import PaginationParams from 'src/interfaces/paginationParams';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
    this.profileService = profileService;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Query() { offset, limit }: PaginationParams) {
    return this.profileService.findAll(+offset, +limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param() id: string) {
    return this.profileService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() profile: CreateProfileDto) {
    return this.profileService.create(profile);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param() id: number,
    @Body() profile: Partial<CreateProfileDto>,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.profileService.update(id, {
      ...profile,
      image: image.filename,
    });
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param() id: string) {
    return this.profileService.remove(+id);
  }
}
