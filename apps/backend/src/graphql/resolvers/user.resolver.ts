import { prisma } from '../../configs';

const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    user: () => {
      return prisma.user.findFirst();
    },
  },
};

export { resolvers };
