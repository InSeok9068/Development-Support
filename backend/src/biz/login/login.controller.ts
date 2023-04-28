import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserParam } from '../users/users.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() userParam: UserParam) {
    return await this.loginService.login(userParam);
  }
}
