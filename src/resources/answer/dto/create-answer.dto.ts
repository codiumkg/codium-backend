import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnswerDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  isCorrectAnswer: boolean;

  @IsOptional()
  @IsNumber()
  taskId: number;
}
