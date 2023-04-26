import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const vben = await prisma.account.upsert({
    where: { userid: '00000001' },
    update: {},
    create: {
      name: 'Vben',
      userid: '00000001',
      email: 'test@gmail.com',
      signature: '海纳百川，有容乃大',
      introduction: '微笑着，努力着，欣赏着',
      title: '交互专家',
      group: '某某某事业群－某某平台部－某某技术部－UED',
      tags: {
        create: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
      },
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      address: 'Xiamen City 77',
      phone: '0592-268888888',
    },
  });

  const leeInseok = await prisma.user.upsert({
    where: { userId: '1' },
    update: {},
    create: {
      userId: '1',
      username: 'dlstjr9068',
      realName: 'Lee In Seok',
      avatar: '',
      desc: 'manager',
      password: '9068',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: {
        create: [
          {
            roleName: 'Super Admin',
            value: 'super',
          },
        ],
      },
    },
  });

  console.log({ vben, leeInseok });
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
