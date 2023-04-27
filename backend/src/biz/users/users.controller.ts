import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Result } from '../common/result';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUserList();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return await this.usersService.getUser(userId);
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
