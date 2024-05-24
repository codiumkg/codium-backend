import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateMethodologyDto {
  @IsNotEmpty()
  @IsString()
  filePath: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  topicId: number;
}
