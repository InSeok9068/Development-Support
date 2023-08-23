import { prisma } from '../configs';

const getCountByUserIdAndPassword = async (userId: string, password: string) => {
  return prisma.user.count({
    where: { userId, password },
  });
};

export { getCountByUserIdAndPassword };
