import { newsletterScrapAction } from '@/schedules/newsletter.scrap.schedule';
import { describe, test } from 'vitest';

describe('뉴스레터 ㅅ크랩 테스트', () => {
  test('GeekNews 스크랩 테스트', async () => {
    await newsletterScrapAction();
  });
});
