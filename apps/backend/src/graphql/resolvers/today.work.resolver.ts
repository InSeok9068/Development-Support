import { createTodayWorkItem, deleteTodayWork, deleteTodayWorkItem, work, works } from '@/service/today.work.service';
import {
  MutationCreateTodayWorkItemArgs,
  MutationDeleteTodayWorkArgs,
  MutationDeleteTodayWorkItemArgs,
  QueryWorkArgs,
  QueryWorksArgs,
} from '@support/shared/types';

const resolvers = {
  Query: {
    work: async (_: unknown, args: QueryWorkArgs) => {
      return await work(Number(args.id));
    },
    works: async (_: unknown, args: QueryWorksArgs) => {
      return await works(args.date);
    },
  },

  Mutation: {
    createTodayWorkItem: async (_: unknown, args: MutationCreateTodayWorkItemArgs) => {
      return await createTodayWorkItem(args.input);
    },
    deleteTodayWork: async (_: unknown, args: MutationDeleteTodayWorkArgs) => {
      return await deleteTodayWork(Number(args.id));
    },
    deleteTodayWorkItem: async (_: unknown, args: MutationDeleteTodayWorkItemArgs) => {
      return await deleteTodayWorkItem(Number(args.id));
    },
  },
};

export { resolvers };
