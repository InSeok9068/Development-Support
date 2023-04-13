import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import * as path from 'path';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
}
