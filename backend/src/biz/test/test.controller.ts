import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class TestController {
  @Get('testRetry')
  @HttpCode(405)
  async testRetry() {}
}
