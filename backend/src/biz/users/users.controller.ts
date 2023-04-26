import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[] | null> {
    return this.usersService.getUserList();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string): Promise<User | null> {
    return this.usersService.getUser(userId);
  }
}
