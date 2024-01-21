import { aiSummary } from '@/services/ai.summary.service';
import { describe, test } from 'vitest';

describe('AI 요약 테스트', () => {
  test('번역 + AI 요약 테스트', async () => {
    console.log(await aiSummary(`테스트`));
  });
});
