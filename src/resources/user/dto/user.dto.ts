import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  groupId?: number;

  role: Role;
}
