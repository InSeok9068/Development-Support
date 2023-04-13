import { Controller, Get, Query } from '@nestjs/common';
import { GoogleTranslation } from './google.translation';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('번역관리')
@Controller('translation')
export class TranslationController {
  constructor(private readonly googleTranslation: GoogleTranslation) {}

  @Get('word')
  @ApiOperation({ summary: '번역하기' })
  translationWord(@Query('word') word: string): Promise<string> {
    return this.googleTranslation.getTranslatedCharacters(word);
  }
}
