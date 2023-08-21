import { prisma } from "../configs";

const getUserDB = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export { getUserDB };
