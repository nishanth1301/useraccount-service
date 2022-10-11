import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AccountService } from './account.service';
import { AddUserDto } from './dto/adduser.dto';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}
  @Post(':id/adduser')
  async adduser(
    @Param('id') accountid: string,
    @Body() params: AddUserDto,
  ): Promise<any> {
    const user = await this.userService.findById(params.member);
    return await this.accountService.addUserToAccount(accountid, user);
  }
}
