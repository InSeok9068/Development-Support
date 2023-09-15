import { CreateTodayWorkItemInput } from '@support/shared/types';
import dayjs from 'dayjs';
import { prisma } from '../configs';

const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
  const now = dayjs();
  const work = await prisma.work.create({
    data: {
      title: input.title,
      tag: input.tag,
      day: now.get('D'),
      month: now.get('M'),
      year: now.get('y'),
      week: now.get('d'),
    },
  });

  await prisma.workItem.create({
    data: {
      workId: work.id,
      content: input.content,
    },
  });

  return work;
};

const deleteTodayWork = async (id: number) => {
  const work = await prisma.work.delete({
    where: {
      id,
    },
  });

  await prisma.workItem.deleteMany({
    where: {
      workId: id,
    },
  });

  return work;
};
const deleteTodayWorkItem = async (id: number) => {
  const workItem = await prisma.workItem.delete({
    where: {
      id,
    },
  });

  return workItem;
};

export { createTodayWorkItem, deleteTodayWork, deleteTodayWorkItem };
