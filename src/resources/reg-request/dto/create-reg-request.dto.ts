import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateRegRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
