import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.menu.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.menuRole.deleteMany({});

  const seedMenus = [
    {
      id: 1,
      label: 'Home',
      children: {
        create: [
          {
            id: 2,
            label: '뉴스레터',
            icon: 'pi pi-fw pi-truck',
            to: '/newsletter',
            component: '@/views/newsletter/NewsletterView.vue',
          },
          {
            id: 3,
            label: '대시보드',
            icon: 'pi pi-fw pi-chart-line',
            to: '/dashboard',
            component: '@/views/dashboard/DashboardView.vue',
          },
        ],
      },
    },
    {
      id: 4,
      label: 'Pages',
      children: {
        create: [
          {
            id: 5,
            label: '오늘 한일',
            icon: 'pi pi-fw pi-check-square',
            to: '/today-work',
            component: '@/views/todayWork/TodayWorkView.vue',
          },
          {
            id: 6,
            label: '한일 목록',
            icon: 'pi pi-fw pi-list',
            to: '/work-list',
            component: '@/views/workList/WorkListView.vue',
          },
          {
            id: 7,
            label: '이름 짓기',
            icon: 'pi pi-fw pi-pencil',
            to: '/namer',
            component: '@/views/namer/NamerView.vue',
          },
        ],
      },
    },
    {
      id: 8,
      label: 'Abouts',
      children: {
        create: [
          {
            id: 9,
            label: '기술 스펙',
            icon: 'pi pi-fw pi-server',
            to: '/tech-spec',
            component: '@/views/techSpec/TechSpecView.vue',
          },
        ],
      },
      menuRoles: {
        create: [
          {
            role: {
              connect: {
                id: 1,
              },
            },
          },
          {
            role: {
              connect: {
                id: 2,
              },
            },
          },
          {
            role: {
              connect: {
                id: 3,
              },
            },
          },
        ],
      },
    },
  ];

  const seedRoles = [
    {
      id: 1,
      name: 'ADMIN',
    },
    {
      id: 2,
      name: 'USE',
    },
    {
      id: 3,
      name: 'GUEST',
    },
  ];

  for (const seedRole of seedRoles) {
    await prisma.role.create({ data: seedRole });
  }

  for (const seedMenu of seedMenus) {
    await prisma.menu.create({ data: seedMenu });
  }

  console.log({
    seedMenus,
    seedRoles,
  });
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
