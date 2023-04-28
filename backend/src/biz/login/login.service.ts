import { Injectable } from '@nestjs/common';
import { LoginDto, UsersService } from '../users/users.service';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    return await this.usersService.getUserForLogin(loginDto);
  }
}
