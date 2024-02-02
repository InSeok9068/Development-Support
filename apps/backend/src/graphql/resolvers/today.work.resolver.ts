import {
  createTodayWorkItem,
  deleteTodayWorkItem,
  sendWeeklyReport,
  suggestions,
  updateTodayWorkItem,
  updateTodayWorkItemForTransfer,
  workItemsBatch,
  works,
} from '@/services/today.work.service';
import { getUid } from '@/utils/header.util';
import { WorkItem } from '@prisma/client';
import {
  MutationCreateTodayWorkItemArgs,
  MutationDeleteTodayWorkItemArgs,
  MutationUpdateTodayWorkItemArgs,
  MutationUpdateTodayWorkItemForTransferArgs,
  QuerySuggestionsArgs,
  QueryWorksArgs,
} from '@support/shared/types';
import DataLoader from 'dataloader';

const batchWorkItems = new DataLoader(
  async (ids: readonly number[]) => {
    const workItems = await workItemsBatch(ids as number[]);
    const workItemMap: Record<number, WorkItem[]> = {};
    workItems.forEach((workItem) => {
      if (!workItemMap[workItem.workId]) {
        workItemMap[workItem.workId] = [];
      }
      workItemMap[workItem.workId].push(workItem);
    });
    return ids.map((id) => workItemMap[id]);
  },
  {
    cache: false,
  },
);

const resolvers = {
  Query: {
    works: async (_: unknown, args: QueryWorksArgs, { headers }: { headers: any }) => {
      args.input.uid = getUid(headers);
      return await works(args.input);
    },
    suggestions: async (_: unknown, args: QuerySuggestionsArgs, { headers }: { headers: any }) => {
      args.input.uid = getUid(headers);
      return await suggestions(args.input);
    },
  },

  Work: {
    workItems: async (parent: { id: number }) => {
      return await batchWorkItems.load(parent.id);
    },
  },

  Mutation: {
    createTodayWorkItem: async (_: unknown, args: MutationCreateTodayWorkItemArgs, { headers }: { headers: any }) => {
      args.input.uid = getUid(headers);
      return await createTodayWorkItem(args.input);
    },
    updateTodayWorkItem: async (_: unknown, args: MutationUpdateTodayWorkItemArgs) => {
      return await updateTodayWorkItem(args.input);
    },
    updateTodayWorkItemForTransfer: async (_: unknown, args: MutationUpdateTodayWorkItemForTransferArgs) => {
      return await updateTodayWorkItemForTransfer(args.input);
    },
    deleteTodayWorkItem: async (_: unknown, args: MutationDeleteTodayWorkItemArgs) => {
      return await deleteTodayWorkItem(Number(args.itemId));
    },
    sendWeeklyReport: (_: unknown, _args: unknown, { headers }: { headers: any }) => {
      return sendWeeklyReport(getUid(headers));
    },
  },
};

export { resolvers };
