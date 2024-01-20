import { Translator } from '@/types/translator.type';

class NaverTranslatorService implements Translator {
  async translateText(text: string): Promise<string> {
    return '';
  }
}
