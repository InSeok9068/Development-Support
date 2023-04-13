import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
}
