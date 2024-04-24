import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAnswerDto } from 'src/resources/answer/dto/create-answer.dto';

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

  @IsArray()
  answers?: CreateAnswerDto[];
}
