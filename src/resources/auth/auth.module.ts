import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService, PrismaService],
})
export class AuthModule {}
