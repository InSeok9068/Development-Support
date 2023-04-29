import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';
import { Result } from '../common/result';
import { LoginDto } from '../login/login.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserList(): Promise<Result<User[]>> {
    const users = await this.prisma.user.findMany({
      include: {
        roles: true,
      },
    });

    return users.length > 0 ? Result.success(users) : Result.error('No users found');
  }

  async getUserByUserId(userId: string): Promise<Result<User>> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
      include: {
        roles: true,
      },
    });

    return user ? Result.success(user) : Result.error('User not found');
  }

  async getUserForLogin(loginDto: LoginDto): Promise<Result<User>> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: {
          equals: loginDto.username,
        },
        password: {
          equals: loginDto.password,
        },
      },
      include: {
        roles: true,
      },
    });

    return user ? Result.success(user) : Result.error('Fail login');
  }
}
