import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.schema';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  accountname: string;
//   @IsBoolean()
//   status = true;

  @IsNotEmpty()
  @IsMongoId({ each: true })
  members: User[];
}
