import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { CreateProfileDto } from 'src/resources/profile/dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
    this.profileService = profileService;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.profileService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param() id: string) {
    return this.profileService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: (req, file, cb) => {
          const name = Date.now().toString() + path.extname(file.originalname);

          cb(null, name);
        },
      }),
    }),
  )
  @Post()
  async create(
    @Body() profile: CreateProfileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 8 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    image: Express.Multer.File,
  ) {
    return this.profileService.create({ ...profile, image: image.filename });
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        filename: (req, file, cb) => {
          const name = Date.now().toString() + path.extname(file.originalname);

          cb(null, name);
        },
      }),
    }),
  )
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
