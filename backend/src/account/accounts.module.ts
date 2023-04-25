import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { Account } from './account.entity';
import { Tag } from './account.tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Tag])],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsModule {}
