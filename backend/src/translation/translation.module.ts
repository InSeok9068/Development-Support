import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { GoogleTranslation } from './google.translation';

@Module({
  controllers: [TranslationController],
  providers: [GoogleTranslation],
})
export class TranslationModule {}
