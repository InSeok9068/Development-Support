import { createTodayWorkItem, work } from '@/services/today.work.service';
import { CreateTodayWorkItemInput } from '@support/shared/types';
import { describe, expect, test } from 'vitest';

describe('오늘 한일 CRUD 테스트', () => {
  test('오늘 한일 등록', async () => {
    const work = await createTodayWorkItem({
      title: '오늘 한일 테스트',
      content: '오늘 한일 테스트 내용',
      date: '2023-01-01',
      time: 2,
    } as CreateTodayWorkItemInput);

    expect(work.title).toBe('오늘 한일 테스트');
  });

  test('오늘 한일 조회', async () => {
    const result = await work(1);
    expect(result.id).toBe(1);
  });
});