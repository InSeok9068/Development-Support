import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }
}
