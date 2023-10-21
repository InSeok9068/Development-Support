import {
  createTodayWorkItem,
  deleteTodayWork,
  deleteTodayWorkItem,
  sendWeeklyReport,
  updateTodayWorkItemForTransfer,
  work,
  works,
} from '@/service/today.work.service';
import {
  MutationCreateTodayWorkItemArgs,
  MutationDeleteTodayWorkArgs,
  MutationDeleteTodayWorkItemArgs,
  MutationUpdateTodayWorkItemForTransferArgs,
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
    updateTodayWorkItemForTransfer: async (_: unknown, args: MutationUpdateTodayWorkItemForTransferArgs) => {
      return await updateTodayWorkItemForTransfer(args.input);
    },
    deleteTodayWork: async (_: unknown, args: MutationDeleteTodayWorkArgs) => {
      return await deleteTodayWork(Number(args.id));
    },
    deleteTodayWorkItem: async (_: unknown, args: MutationDeleteTodayWorkItemArgs) => {
      return await deleteTodayWorkItem(Number(args.id));
    },
    sendWeeklyReport: (_: unknown) => {
      return sendWeeklyReport();
    },
  },
};

export { resolvers };
