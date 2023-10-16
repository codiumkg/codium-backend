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
import { CreateProfileDto } from 'src/resources/profile/dto/profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
    this.profileService = profileService;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getQuizzes() {
    return this.profileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getQuizById(@Param() id: string) {
    return this.profileService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createQuiz(@Body() profile: CreateProfileDto) {
    return this.profileService.create(profile);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateQuiz(
    @Param() id: number,
    @Body() profile: Partial<CreateProfileDto>,
  ) {
    return this.profileService.update(id, profile);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteQuiz(@Param() id: string) {
    return this.profileService.remove(+id);
  }
}
