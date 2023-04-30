import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto, LoginService } from './login.service';
import { AuthGuard } from '../auth/auth.guard';
import { Result } from '../util/result';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async loout() {
    return Result.success(null);
  }
}
