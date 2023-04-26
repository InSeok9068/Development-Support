import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { Result } from '../common/result';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<Result<User[]>> {
    return this.usersService.getUserList();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string): Promise<Result<User>> {
    return this.usersService.getUser(userId);
  }

  @HttpCode(401)
  @Post(':userId/session-timeout')
  async userSessionTimeout(): Promise<Result<null>> {
    return Result.success();
  }

  @Post(':userId/token-expired')
  async userTokenExpired(): Promise<Result<null>> {
    return Result.timeout('Token Expired!');
  }
}
