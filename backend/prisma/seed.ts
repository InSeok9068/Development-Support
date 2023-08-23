import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: 'dlstjr9068',
      password: '9068',
      username: '이인석',
      email: 'dlstjr9068@gmail.com',
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
