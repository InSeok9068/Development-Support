import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
}
