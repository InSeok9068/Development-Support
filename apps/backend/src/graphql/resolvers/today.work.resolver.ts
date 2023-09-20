import { prisma } from '@/configs';
import { createTodayWorkItem, deleteTodayWork, deleteTodayWorkItem } from '@/service/today.work.service';
import {
  MutationCreateTodayWorkItemArgs,
  MutationDeleteTodayWorkArgs,
  MutationDeleteTodayWorkItemArgs,
  QueryWorkArgs,
  QueryWorksArgs,
} from '@support/shared/types';
import dayjs from 'dayjs';

const resolvers = {
  Query: {
    work: (_: unknown, args: QueryWorkArgs) => {
      return prisma.work.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
    works: (_: unknown, args: QueryWorksArgs) => {
      const date = dayjs(args.date);
      return prisma.work.findMany({
        where: {
          year: date.get('y'),
          month: date.get('M'),
          day: date.get('D'),
        },
        include: {
          workItems: {},
        },
      });
    },
  },

  Mutation: {
    createTodayWorkItem: async (_: unknown, args: MutationCreateTodayWorkItemArgs) => {
      return createTodayWorkItem(args.input);
    },
    deleteTodayWork: async (_: unknown, args: MutationDeleteTodayWorkArgs) => {
      return deleteTodayWork(Number(args.id));
    },
    deleteTodayWorkItem: async (_: unknown, args: MutationDeleteTodayWorkItemArgs) => {
      return deleteTodayWorkItem(Number(args.id));
    },
  },
};

export { resolvers };
