import {
  createTodayWorkItem,
  deleteTodayWorkItem,
  sendWeeklyReport,
  suggestions,
  updateTodayWorkItemForTransfer,
  works,
} from '@/services/today.work.service';
import { getUid } from '@/utils/header.util';
import {
  MutationCreateTodayWorkItemArgs,
  MutationDeleteTodayWorkItemArgs,
  MutationUpdateTodayWorkItemForTransferArgs,
  QuerySuggestionsArgs,
  QueryWorksArgs,
} from '@support/shared/types';

const resolvers = {
  Query: {
    works: async (_: unknown, args: QueryWorksArgs, { headers }: { headers: any }) => {
      getUid(headers);
      return await works(args.date);
    },
    suggestions: async (_: unknown, args: QuerySuggestionsArgs, { headers }: { headers: any }) => {
      return await suggestions(args.title);
    },
  },

  Mutation: {
    createTodayWorkItem: async (_: unknown, args: MutationCreateTodayWorkItemArgs, { headers }: { headers: any }) => {
      args.input.uid = getUid(headers);
      return await createTodayWorkItem(args.input);
    },
    updateTodayWorkItemForTransfer: async (_: unknown, args: MutationUpdateTodayWorkItemForTransferArgs) => {
      return await updateTodayWorkItemForTransfer(args.input);
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
