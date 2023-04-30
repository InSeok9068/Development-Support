import { PrismaClient } from '@prisma/client';
import { AccountSeed } from './seed.data/account.seed';
import { AdminUserSeed } from './seed.data/admin.user.seed';

const prisma = new PrismaClient();

async function main() {
  const accountSeed = await prisma.account.upsert(AccountSeed);
  const adminUserSeed = await prisma.user.upsert(AdminUserSeed);
  // prisma.menu.upsert();

  console.log({ accountSeed, adminUserSeed });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
