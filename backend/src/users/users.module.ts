import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { RoleInfo } from './role/role.info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RoleInfo])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
