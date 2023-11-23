import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsString()
  openAnswer?: string;

  @IsOptional()
  @IsString()
  tip?: string;

  @IsNumber()
  @IsNotEmpty()
  quizId: number;
}
