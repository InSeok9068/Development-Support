import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface LoginDto {
  username: string;
  password: string;
}

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    const userResult = await this.usersService.getUserForLogin(loginDto);
    if (userResult.isSuccess()) {
      const user = userResult.result;
      const payload = { username: user.username, sub: user.userId };

      user.token = await this.jwtService.signAsync(payload);

      return userResult;
    } else {
      throw new UnauthorizedException();
    }
  }
}
