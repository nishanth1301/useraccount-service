import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from 'src/user/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign_up')
  @UsePipes(ValidationPipe)
  async signUp(@Body() params: UserDto): Promise<any> {
    try {
      return await this.authService.signup(params);
    } catch {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }
}
