import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/exec')
  async executeCode(
    @Body() body: { files: { filename: string; content: string }[] },
  ) {
    const { files } = body;

    if (!files) {
      throw new BadRequestException('No files provided');
    }

    if (!files.some((file) => file.filename === 'main.py')) {
      throw new BadRequestException('No main file provided');
    }

    const execDir = path.join(__dirname, `exec_${Date.now()}`);

    fs.mkdirSync(execDir);

    try {
      await Promise.all(
        files.map(async (file) => {
          const { filename, content } = file;
          const filePath = path.join(execDir, filename);
          await fs.promises.writeFile(filePath, content); // Asynchronously write file
        }),
      );

      let mainFile = 'main.py';

      const command = `docker run --rm -v ${execDir}:/code -w /code python:3.9-slim python ${mainFile}`;

      const { stdout, stderr } = await execAsync(command);

      fs.rmSync(execDir, { recursive: true, force: true });

      if (stderr) {
        return { error: stderr, output: null };
      }

      return { output: stdout };
    } catch (e) {
      fs.rmSync(execDir, { recursive: true, force: true });

      throw new InternalServerErrorException(e.message);
    }
  }
}
