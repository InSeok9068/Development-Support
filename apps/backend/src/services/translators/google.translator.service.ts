import { Translator } from '@/types/translator.type';

class GoogleTranslatorService implements Translator {
  async translateText(text: string): Promise<string> {
    return '';
  }
}
