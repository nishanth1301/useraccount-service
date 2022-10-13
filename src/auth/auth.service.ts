import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from 'src/account/account.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { SignDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
  ) {}
  async signup(params: SignDto): Promise<any> {
    let user = null;
    try {
      user = await this.userService.create(params);
      let account;
      if (user) {
        account = await this.accountService.create({
          accountname: params.accountname,
          members: [user],
        });
      }
      let userinfo;
      if (account) {
        userinfo = await this.userService.addAccount(user.id, account);
      }

      return { success: true, user: userinfo };
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
