import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { TranslationModule } from './biz/translation/translation.module';
import { UsersModule } from './biz/users/users.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { LoginModule } from './biz/login/login.module';

@Module({
  imports: [
    // SPA 페이지 로드
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // 컨피그 전역 설정
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TranslationModule,
    UsersModule,
    LoginModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
