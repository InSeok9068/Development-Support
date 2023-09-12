import { DeleteTodayWorkInput, MutationCreateTodayWorkArgs } from '@support/shared/types';
import dayjs from 'dayjs';
import { prisma } from '../../configs';

const resolvers = {
  Query: {
    works: () => {
      return prisma.work.findMany();
    },
  },

  Mutation: {
    createTodayWork: async (_: any, args: MutationCreateTodayWorkArgs) => {
      const now = dayjs();
      const work = await prisma.work.create({
        data: {
          title: args.input.title,
          tag: args.input.tag,
          day: now.get('D'),
          month: now.get('M'),
          year: now.get('y'),
          week: now.get('d'),
        },
      });
      const workItem = await prisma.workItem.create({
        data: {
          workId: work.id,
          content: args.input.content,
        },
      });

      return !!workItem && !!work;
    },
    deleteTodayWork: (input: DeleteTodayWorkInput) => {
      prisma.work.delete({
        where: {
          id: Number(input.id),
        },
      });
      prisma.workItem.deleteMany({
        where: {
          workId: Number(input.id),
        },
      });
    },
  },
};

export { resolvers };
