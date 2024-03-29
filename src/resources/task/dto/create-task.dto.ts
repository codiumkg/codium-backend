import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
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
  topicId: number;
}
