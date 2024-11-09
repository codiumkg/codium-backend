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
}
