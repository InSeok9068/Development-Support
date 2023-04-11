import { Translation } from './interfaces/translation.interface';

export class NaverTranslation implements Translation {
  getTranslatedCharacters(word: string): string {
    return word;
  }
}
