import { prisma } from '@/configs/__mocks__/prisma.config';
import { test, vi } from 'vitest';

vi.mock('@/configs/prisma.config');

test('Prisma Mock Sample Code', async () => {
  const resultWork = {
    uid: 'adasdasfdsfsa',
    id: 1,
    title: '테스트 데이터',
    year: 2023,
    month: 12,
    date: 20231231,
    week: 4,
    time: 1,
    tag: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prisma.work.findUniqueOrThrow.mockResolvedValue(resultWork);

  console.log(
    await prisma.work.findUniqueOrThrow({
      where: {
        id: 1,
      },
    }),
  );
});
