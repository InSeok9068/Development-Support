import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { TranslationModule } from './biz/translation/translation.module';
import { UsersModule } from './biz/users/users.module';
import { LoginModule } from './biz/login/login.module';
import { GPrismaModule } from './config/prisma/prisma.module';
import { GJwtModule } from './biz/core/jwt.module';
import { MenusModule } from './biz/menus/menus.module';

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
    GJwtModule,
    GPrismaModule,
    TranslationModule,
    UsersModule,
    LoginModule,
    MenusModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
