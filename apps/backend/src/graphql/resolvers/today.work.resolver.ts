import { prisma } from '@/configs';
import { createTodayWorkItem, deleteTodayWork, deleteTodayWorkItem } from '@/service/today.work.service';
import { MutationCreateTodayWorkItemArgs, MutationDeleteTodayWorkArgs, QueryWorkArgs } from '@support/shared/types';

const resolvers = {
  Query: {
    work: (_: unknown, args: QueryWorkArgs) => {
      return prisma.work.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
    works: () => {
      return prisma.work.findMany();
    },
  },

  Mutation: {
    createTodayWorkItem: async (_: unknown, args: MutationCreateTodayWorkItemArgs) => {
      return createTodayWorkItem(args.input);
    },
    deleteTodayWork: async (_: unknown, args: MutationDeleteTodayWorkArgs) => {
      return deleteTodayWork(Number(args.id));
    },
    deleteTodayWorkItem: async (_: unknown, args: MutationCreateTodayWorkItemArgs) => {
      return deleteTodayWorkItem(Number(args.input));
    },
  },
};

export { resolvers };
