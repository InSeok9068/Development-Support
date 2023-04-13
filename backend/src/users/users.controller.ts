import { UsersService } from './users.service';
import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저관리')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '유저 리스트 조회' })
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
