import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging/logging.interceptor';

async function bootstrap() {
  const loggerLevel: LogLevel[] =
    process.env.NODE_ENV == 'dev' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn'];

  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel,
  });

  // 인터셉터 전역 설정
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(4000);
}

bootstrap();
