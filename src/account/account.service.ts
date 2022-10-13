import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
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
  async findAll(params: any, page: any): Promise<any> {
    const { filter, sort, limit } = aqp(params);
    console.info((page - 1 || 0) * limit);
    if (filter['search']) {
      const accounts = await this.accountModel
        .find({ name: { $regex: filter.search } })
        .limit(limit)
        // .populate('members')
        .skip((page - 1 || 0) * limit)
        .sort(<any>sort);

      const total_count: number = await this.accountModel
        .find({ name: { $regex: filter.search } })
        .count();

      return {
        success: true,
        account: accounts,
        meta: {
          pageLimit: limit,
          currentPage: parseInt(page),
          total_count,
        },
      };
    } else {
      const accounts = await this.accountModel
        .find(filter)
        .limit(limit)
        // .populate('members')
        .sort(<any>sort)
        .skip((page - 1 || 0) * limit);
      const total_count: number = await this.accountModel.find(filter).count();
      return {
        success: true,
        account: accounts,
        meta: {
          pageLimit: limit,
          currentPage: parseInt(page),
          total_count,
        },
      };
}
  }
}
