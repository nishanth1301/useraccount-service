import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { filter } from 'rxjs';
import { QUERY_PARAMS } from 'src/utilis/pafinationParams';
import { UserFilterDto } from './dtos/user-filter.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('invite')
  async create(@Body() params: UserDto): Promise<any> {
    try {
      return await this.userService.create(params);
    } catch {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  async findAll(
    @Query()
    param: UserFilterDto,
  ): Promise<any> {
    if (Object.keys(param).length) {
      return this.userService.findWithFilters(param);
    } else {
      return this.userService.getAll();
    }
  }
  @Get('getalluser')
  async getAllAccounts(@Query() params: any): Promise<any> {
    if (!params.page) {
      params.page = 1;
    }
    const accounts = await this.userService.findAll(
      QUERY_PARAMS(params),
      params.page,
    );
    return accounts;
  }
}
