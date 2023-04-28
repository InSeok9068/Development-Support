import { Injectable } from '@nestjs/common';
import { UserParam, UsersService } from '../users/users.service';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  async login(userParam: UserParam) {
    return await this.usersService.getUserForLogin(userParam);
  }
}
