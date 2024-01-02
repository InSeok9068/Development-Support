import { prisma } from '@/configs';
import {
  CreateTodayWorkItemInput,
  SuggestionsInput,
  UpdateTodayWorkItemForTransferInput,
  UpdateTodayWorkItemInput,
  WorkInput,
  WorksInput,
} from '@support/shared/types';
import dayjs from 'dayjs';

const work = async (input: WorkInput) => {
  const work = await prisma.work.findFirstOrThrow({
    where: {
      workItems: {
        every: {
          itemId: Number(input.itemId),
        },
      },
    },
    include: {
      workItems: {},
    },
  });
  return work;
};

const works = async (input: WorksInput) => {
  const works = await prisma.work.findMany({
    where: {
      uid: input.uid!,
      date: {
        lte: Number(dayjs(input.startDate).format('YYYYMMDD')),
        gte: Number(dayjs(input.endDate).format('YYYYMMDD')),
      },
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
      uid: input.uid!,
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
        uid: input.uid!,
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

const updateTodayWorkItem = async (input: UpdateTodayWorkItemInput) => {};

const updateTodayWorkItemForTransfer = async (input: UpdateTodayWorkItemForTransferInput) => {
  const workItem = await prisma.workItem.findFirstOrThrow({
    where: {
      itemId: Number(input.itemId),
    },
  });

  const work = await prisma.work.findFirstOrThrow({
    where: {
      id: Number(input.id),
    },
  });

  await prisma.work.update({
    data: {
      time: {
        decrement: workItem.time,
      },
    },
    where: {
      id: workItem.workId,
    },
  });

  await prisma.work.update({
    data: {
      time: {
        increment: workItem.time,
      },
    },
    where: {
      id: work.id,
    },
  });

  const updateWorkItem = await prisma.workItem.update({
    data: {
      workId: work.id,
    },
    where: {
      itemId: workItem.itemId,
    },
  });

  const workList = await prisma.workItem.findMany({
    where: {
      workId: workItem.workId,
    },
  });

  if (workList.length === 0) {
    await prisma.work.delete({
      where: {
        id: workItem.workId,
      },
    });
  }

  return work;
};

const deleteTodayWorkItem = async (itemId: number) => {
  const workItem = await prisma.workItem.findUniqueOrThrow({
    where: {
      itemId,
    },
  });

  const work = await prisma.work.findUniqueOrThrow({
    where: {
      id: workItem.workId,
    },
    include: {
      workItems: {},
    },
  });

  if (work.workItems.length === 1) {
    await prisma.workItem.delete({
      where: {
        itemId,
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
        time: {
          decrement: workItem.time,
        },
      },
      where: {
        id: work.id,
      },
    });

    await prisma.workItem.delete({
      where: {
        itemId,
      },
    });
  }

  return workItem;
};

const suggestions = async (input: SuggestionsInput) => {
  const suggestions = await prisma.work.findMany({
    where: {
      uid: input.uid!,
      title: {
        startsWith: input.title,
      },
    },
  });

  return suggestions;
};

const sendWeeklyReport = (uid: string) => {
  return true;
};

export {
  createTodayWorkItem,
  deleteTodayWorkItem,
  sendWeeklyReport,
  suggestions,
  updateTodayWorkItem,
  updateTodayWorkItemForTransfer,
  work,
  works,
};
