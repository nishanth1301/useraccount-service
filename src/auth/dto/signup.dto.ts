import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class SignDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  accountname: string;
}
