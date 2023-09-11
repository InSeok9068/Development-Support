import { prisma } from '../../configs';

const resolvers = {
  Query: {
    works: () => {
      return prisma.work.findMany();
    },
  },

  Mutation: {
    // createTodayWork: ({ title, tag, content }: Work) => {
    //   prisma.work.create({
    //     data: { title, tag },
    //   });
    // },
  },
};

export { resolvers };
