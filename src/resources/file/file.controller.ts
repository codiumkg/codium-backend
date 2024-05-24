import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('file/upload/')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/docs',
        filename: (req, file, cb) => {
          const originalName = path.basename(
            file.originalname,
            path.extname(file.originalname),
          );
          const name =
            originalName +
            '_' +
            Date.now().toString() +
            path.extname(file.originalname);

          cb(null, name);
        },
      }),
    }),
  )
  @Post()
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /.(docx|doc|pptx|txt)/i })
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 100 })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return {
      filename: file.filename,
      path: file.path,
    };
  }
}
