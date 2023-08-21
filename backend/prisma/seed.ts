import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: '이인석',
      email: 'dlstjr9068@gmail.com',
      password: '1111',
    },
  });

  console.log({
    user,
  });

  console.log('Example data upsert successfully!');
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
