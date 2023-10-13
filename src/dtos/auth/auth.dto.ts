import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  bio?: string;

  @IsString()
  image?: string;

  @IsEmail()
  email?: string;

  @IsNumber()
  subjectId?: number;

  role: Role;

  @IsNotEmpty()
  @IsNumber()
  profileId: number;
}
