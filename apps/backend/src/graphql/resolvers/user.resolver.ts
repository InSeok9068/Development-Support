import { prisma } from '../../configs';

const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    user: () => {
      return prisma.user.findUnique({
        where: {
          id: 1,
        },
      });
    },
  },
};

export { resolvers };
