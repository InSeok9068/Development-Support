import { Translation } from './interfaces/translation.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverTranslation implements Translation {
  async getTranslatedCharacters(word: string): Promise<string> {
    return word;
  }
}
