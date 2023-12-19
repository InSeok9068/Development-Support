import { prisma } from '@/configs';
import {
  CreateTodayWorkItemInput,
  SuggestionsInput,
  UpdateTodayWorkItemForTransferInput,
  WorksInput,
} from '@support/shared/types';
import dayjs from 'dayjs';

const works = async (input: WorksInput) => {
  const works = await prisma.work.findMany({
    where: {
      uid: input.uid!,
      date: Number(dayjs(input.date).format('YYYYMMDD')),
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

const updateTodayWorkItemForTransfer = async (input: UpdateTodayWorkItemForTransferInput) => {
  const workItem = await prisma.workItem.findFirstOrThrow({
    where: {
      id: Number(input.itemId),
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
      id: workItem.id,
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

  return updateWorkItem;
};

const deleteTodayWorkItem = async (id: number) => {
  const workItem = await prisma.workItem.findUniqueOrThrow({
    where: {
      id,
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
        id,
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

const sendWeeklyReport = () => {
  return true;
};

export {
  createTodayWorkItem,
  deleteTodayWorkItem,
  sendWeeklyReport,
  suggestions,
  updateTodayWorkItemForTransfer,
  works,
};
