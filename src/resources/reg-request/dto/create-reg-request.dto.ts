import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateRegRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsBoolean()
  @IsOptional()
  isChecked: boolean;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
