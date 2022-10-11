import { Exclude } from 'class-transformer';
import { IsAlpha, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserDto {
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
  @Exclude({ toPlainOnly: true })
  password: string;

  @IsNotEmpty()
  accountname: string;
}
