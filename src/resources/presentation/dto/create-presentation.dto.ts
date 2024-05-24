import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePresentationDto {
  @IsString()
  @IsNotEmpty()
  filePath: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  topicId: number;
}
