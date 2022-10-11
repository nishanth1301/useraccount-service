import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/user/dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign_up')
  async signUp(@Body() params: UserDto): Promise<any> {
    return await this.authService.signup(params);
  }
}
