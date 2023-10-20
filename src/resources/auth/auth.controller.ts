import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from 'src/resources/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from './has-roles.decorator';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('/login')
  async login(@Body() { username, password }: LoginDto) {
    return this.authService.login({ username, password });
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/signup')
  async signup(@Body() user: SignupDto) {
    return this.authService.signup(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status')
  async status() {
    return HttpStatus.OK;
  }
}
