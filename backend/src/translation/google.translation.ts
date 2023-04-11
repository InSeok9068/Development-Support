import { Translation } from './interfaces/translation.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleTranslation implements Translation {
  getTranslatedCharacters(word: string): string {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    return word;
  }
}
