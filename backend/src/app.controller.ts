import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  root(@Res() res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
}
