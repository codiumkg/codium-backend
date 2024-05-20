import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, LoginDto } from 'src/resources/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Request } from 'express';
import { GetUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('/login')
  async login(@Body() { username, password }: LoginDto) {
    return this.authService.login({ username, password });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  async changePassword(@Body() body: ChangePasswordDto, @GetUser() user: User) {
    return this.authService.changePassword(body, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status')
  async status(@Req() req: Request) {
    const { authorization } = req.headers;

    const token = authorization.replace('Bearer ', '');

    return this.authService.status(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/userdata')
  async userdata(@Req() req: Request) {
    const { authorization } = req.headers;

    const token = authorization.replace('Bearer ', '');

    return this.authService.status(token);
  }
}
