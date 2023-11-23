import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  subjectId: number;
}
