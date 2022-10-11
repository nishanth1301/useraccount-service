import { IsMongoId } from 'class-validator';

export class AddUserDto {
  @IsMongoId()
  member: string;
}
