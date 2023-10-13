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
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { CreateProfileDto } from 'src/dtos/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
    this.profileService = profileService;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getQuizzes() {
    return this.profileService.getProfiles();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getQuizById(@Param() id: number) {
    return this.profileService.getProfileById(id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createQuiz(@Body() profile: CreateProfileDto) {
    return this.profileService.createProfile(profile);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateQuiz(
    @Param() id: number,
    @Body() profile: Partial<CreateProfileDto>,
  ) {
    return this.profileService.updateProfile(id, profile);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteQuiz(@Param() id: number) {
    return this.profileService.deleteProfile(id);
  }
}
