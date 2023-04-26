import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import { Result } from '../common/result';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserList(): Promise<Result<User[]>> {
    const users = await this.prisma.user.findMany();

    if (users.length > 0) {
      return Result.success(users);
    } else {
      return Result.error('No users found');
    }
  }

  async getUser(userId: string): Promise<Result<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        roles: true,
      },
    });

    if (user) {
      return Result.success(user);
    } else {
      return Result.error('User not found');
    }
  }
}
