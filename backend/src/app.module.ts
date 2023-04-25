import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { TranslationModule } from './translation/translation.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './account/accounts.module';

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
    // DB 설정
    TypeOrmModule.forRoot({
      type: 'sqlite', // - DB 종류
      database: 'db/DEVELOPMENT-SUPPORT.db', // - DB 파일 이름
      autoLoadEntities: true, // - 구동시 entity파일 자동 로드
      synchronize: process.env.NODE_ENV == 'dev', // - 서비스 구동시 entity와 디비의 테이블 싱크 개발만 할것
      dropSchema: process.env.NODE_ENV == 'dev', // - 구동시 해당 테이블 삭제 synchronize와 동시 사용
      logging: true, // - orm 사용시 로그 남기기
    }),
    TranslationModule,
    UsersModule,
    AccountsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
