import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenus() {
    return await this.prisma.menu.findMany({
      where: {
        OR: [
          { parentId: null },
          {
            NOT: {
              parentId: {
                not: null,
              },
            },
          },
        ],
      },
      include: {
        children: {
          include: {
            children: {
              include: {
                children: true,
              },
            },
          },
        },
      },
    });
  }
}
