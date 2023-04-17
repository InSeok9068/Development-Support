import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging/logging.interceptor';

async function bootstrap() {
  const loggerLevel: LogLevel[] =
    process.env.NODE_ENV == 'dev' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn'];

  const app = await NestFactory.create(AppModule, {
    logger: loggerLevel,
  });

  // 스웨거 설정
  const config = new DocumentBuilder()
    .setTitle('Development Support')
    .setDescription('개발 도우미')
    .setVersion('1.0')
    .addTag('Development')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 인터셉터 전역 설정
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(4000);
}

bootstrap();
