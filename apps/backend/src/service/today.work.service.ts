import { prisma } from '@/configs';
import { CreateTodayWorkItemInput } from '@support/shared/types';
import dayjs from 'dayjs';

const work = async (id: number) => {
  const work = await prisma.work.findUnique({
    where: {
      id,
    },
  });
  return work;
};

const works = async (date: string) => {
  const works = await prisma.work.findMany({
    where: {
      date: Number(dayjs(date).format('YYYYMMDD')),
    },
    include: {
      workItems: {},
    },
  });
  return works;
};

const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
  const now = dayjs(input.date);
  const date = {
    date: Number(now.format('YYYYMMDD')),
    month: now.get('M'),
    year: now.get('y'),
    week: now.get('d'),
  };

  const work = await prisma.work.findFirst({
    where: {
      title: input.title,
      date: Number(dayjs(input.date).format('YYYYMMDD')),
    },
  });

  if (work && work.title === input.title) {
    await prisma.work.update({
      data: {
        time: work.time + input.time,
      },
      where: {
        id: work.id,
      },
    });

    await prisma.workItem.create({
      data: {
        workId: work.id,
        content: input.content,
        time: input.time,
      },
    });

    return work;
  } else {
    const work = await prisma.work.create({
      data: {
        title: input.title,
        tag: input.tag,
        time: input.time,
        ...date,
      },
    });

    await prisma.workItem.create({
      data: {
        workId: work.id,
        content: input.content,
        time: input.time,
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

    if (work) {
      if (work.workItems.length === 1) {
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
        await prisma.work.update({
          data: {
            time: work.time - workItem.time,
          },
          where: {
            id: work.id,
          },
        });

        await prisma.workItem.delete({
          where: {
            id,
          },
        });
      }
    }
  }

  return workItem;
};

export { createTodayWorkItem, deleteTodayWork, deleteTodayWorkItem, work, works };
