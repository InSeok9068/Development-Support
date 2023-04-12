import { Translation } from './interfaces/translation.interface';
import { Injectable } from '@nestjs/common';
import { v2 } from '@google-cloud/translate';
import { Translate } from '@google-cloud/translate/build/src/v2';

@Injectable()
export class GoogleTranslation implements Translation {
  private readonly translate: Translate;

  constructor() {
    this.translate = new v2.Translate();
  }

  async getTranslatedCharacters(word: string): Promise<string> {
    const [translations] = await this.translate.translate(word, 'en');
    return translations;
  }
}
