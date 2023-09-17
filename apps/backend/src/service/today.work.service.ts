import { prisma } from '@/configs';
import { CreateTodayWorkItemInput } from '@support/shared/types';
import dayjs from 'dayjs';

const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
  const now = dayjs();
  const date = {
    day: now.get('D'),
    month: now.get('M'),
    year: now.get('y'),
    week: now.get('d'),
  };

  const work = await prisma.work.findFirstOrThrow({
    where: {
      title: input.title,
    },
  });

  if (work && work.title === input.title) {
    await prisma.workItem.create({
      data: {
        workId: work.id,
        content: input.content,
      },
    });

    return work;
  } else {
    const work = await prisma.work.create({
      data: {
        title: input.title,
        tag: input.tag,
        ...date,
      },
    });

    await prisma.workItem.create({
      data: {
        workId: work.id,
        content: input.content,
      },
    });

    return work;
  }
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
  const workItem = await prisma.workItem.findUnique({
    where: {
      id,
    },
  });

  if (workItem) {
    const work = await prisma.work.findUnique({
      where: {
        id: workItem.workId,
      },
      include: {
        workItems: {},
      },
    });

    if (work?.workItems.length === 1) {
      await prisma.workItem.delete({
        where: {
          id,
        },
      });

      await prisma.work.delete({
        where: {
          id: workItem.workId,
        },
      });
    } else {
      await prisma.workItem.delete({
        where: {
          id,
        },
      });
    }
  }

  return workItem;
};

export { createTodayWorkItem, deleteTodayWork, deleteTodayWorkItem };
