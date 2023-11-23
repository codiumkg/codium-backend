import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  topicId: number;
}
