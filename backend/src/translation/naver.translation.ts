import { Translation } from './interfaces/translation.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverTranslation implements Translation {
  getTranslatedCharacters(word: string): string {
    return word;
  }
}
