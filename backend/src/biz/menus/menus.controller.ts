import { Controller, Get, Headers } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  // @UseGuards(AuthGuard)
  async getMenus(@Headers() headers) {
    return await this.menusService.getMenus();
  }
}
