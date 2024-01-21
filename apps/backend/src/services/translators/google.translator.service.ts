import { Translator, TranslatorRequest } from '@/types/translator.type';

class GoogleTranslatorService implements Translator {
  async translateText(param: TranslatorRequest): Promise<string> {
    return '';
  }
}

const googleTranslatorService = new GoogleTranslatorService();

export { googleTranslatorService };
