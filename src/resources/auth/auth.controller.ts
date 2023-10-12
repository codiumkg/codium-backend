import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/auth/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @Post('/login')
  async login({ username, password }: LoginDto) {
    return this.authService.login({ username, password });
  }
}
