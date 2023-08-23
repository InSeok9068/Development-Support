import { prisma } from '../configs';

const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const getUserByUserIdAndPassword = async (userId: string, password: string) => {
  return prisma.user.findUnique({
    where: { userId, password },
  });
};

export { getUserById, getUserByUserIdAndPassword };
