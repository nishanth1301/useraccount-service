import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dtos/user.dto';
import { Account, AccountDocument } from './account.schema';
import { CreateAccountDto } from './dto/create.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}
  async create(params: CreateAccountDto) {
    return await this.accountModel.create(params);
  }
  async addUserToAccount(AccountId, user) {
    return await this.accountModel.findByIdAndUpdate(
      AccountId,
      { $push: { members: user._id } },
      { new: true, useFindAndModify: false },
    );
  }
  async findById(id: string) {
    return await this.accountModel.findById(id);
  }
}
