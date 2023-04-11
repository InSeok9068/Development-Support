import { Controller, Get, Query } from '@nestjs/common';
import { GoogleTranslation } from './google.translation';

@Controller('translation')
export class TranslationController {
  constructor(private readonly googleTranslation: GoogleTranslation) {}

  @Get('word')
  translationWord(@Query('word') word: string): string {
    return this.googleTranslation.getTranslatedCharacters(word);
  }
}
