import { Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Result } from '../common/result';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUserList();
  }

  @Get()
  async getUser(@Query('userId') userId: string) {
    return await this.usersService.getUserByUserId(userId);
  }

  @HttpCode(401)
  @Post(':userId/session-timeout')
  userSessionTimeout() {
    return Result.success();
  }

  @Post(':userId/token-expired')
  userTokenExpired() {
    return Result.timeout('Token Expired!');
  }
}
