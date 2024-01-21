import { naverTranslatorService } from '@/services/translators/naver.translator.service';
import { describe, test } from 'vitest';

describe('번역 API 테스트', () => {
  test('네이버 번역 API 테스트', async () => {
    const result = await naverTranslatorService.translateText({
      source: 'en',
      target: 'ko',
      text: 'Hello',
    });

    console.log(result);
  });
});
