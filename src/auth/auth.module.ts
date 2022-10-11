import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, AccountModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
