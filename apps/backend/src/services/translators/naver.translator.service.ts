import { NaverTranslatorResponse, Translator, TranslatorRequest } from '@/types/translator.type';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

class NaverTranslatorService implements Translator {
  async translateText(param: TranslatorRequest): Promise<string> {
    const reponse = await axios.post<NaverTranslatorResponse>(process.env.NAVER_PAPAGO_API_HOST as string, param, {
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_API_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_API_CLIENT_SECRET,
      },
    });
    return reponse.data.message.result.translatedText;
  }
}

const naverTranslatorService = new NaverTranslatorService();

export { naverTranslatorService };
