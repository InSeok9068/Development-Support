import { Controller, Get, HttpCode, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Result } from '../util/result';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  async getUsers() {
    return await this.usersService.getUserList();
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@Query('userId') userId: string) {
    return await this.usersService.getUserByUserId(userId);
  }

  @HttpCode(401)
  @Post('/session-timeout')
  userSessionTimeout() {
    return Result.success();
  }

  @Post('/token-expired')
  userTokenExpired() {
    return Result.timeout('Token Expired!');
  }
}
