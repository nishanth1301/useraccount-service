import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { QUERY_PARAMS } from 'src/utilis/pafinationParams';
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
  @Get('getallaccount')
  async getAllAccounts(@Query() params: any): Promise<any> {
    if (!params.page) {
      params.page = 1;
    }
    const accounts = await this.accountService.findAll(
      QUERY_PARAMS(params),
      params.page,
    );
    return accounts;
  }
}
