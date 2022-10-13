import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { Model } from 'mongoose';
import { Account } from 'src/account/account.schema';
import { encodePassword } from 'src/utilis/pafinationParams';
import { InvitationDto } from './dtos/invite.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
import { UserDto } from './dtos/user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(params: UserDto) {
    const password = await encodePassword(params.password);
    params.password = password;
    return await this.userModel.create(params);
  }
  async addAccount(id: string, account: Account) {
    const user = await this.userModel.findById(id);
    console.info(user, account);
    user.account = account._id;
    await user.save();
    return user;
  }
  async findById(id: string) {
    return await this.userModel.findById(id);
  }
  async getAll() {
    return await this.userModel.find().sort({ createdAt: -1 });
  }
  async findWithFilters(filter: UserFilterDto) {
    const name = Object.is(filter.name, undefined) ? '' : filter.name;
    const email = Object.is(filter.email, undefined) ? '' : filter.email;
    return await this.userModel.find({
      $and: [{ email: { $regex: email } }, { name: { $regex: name } }],
    });
  }
  async findAll(params: any, page: any): Promise<any> {
    const { filter, sort, limit } = aqp(params);
    console.info((page - 1 || 0) * limit);
    if (filter['search']) {
      const accounts = await this.userModel
        .find({ name: { $regex: filter.search } })
        .limit(limit)
        .populate('account')

        .skip((page - 1 || 0) * limit)
        .sort(<any>sort);

      const total_count: number = await this.userModel
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
      const accounts = await this.userModel
        .find(filter)
        .limit(limit)
        .populate('account')
        .sort(<any>sort)
        .skip((page - 1 || 0) * limit);
      const total_count: number = await this.userModel.find(filter).count();
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
