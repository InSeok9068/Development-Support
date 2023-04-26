import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserList(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async getUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        roles: true,
      },
    });
  }
}
