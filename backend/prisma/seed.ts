import { PrismaClient } from '@prisma/client';
import { AccountSeed } from './seed.data/account.seed';
import { AdminUserSeed, TestUserSeed } from './seed.data/admin.user.seed';

const prisma = new PrismaClient();

async function main() {
  const accountSeed = await prisma.account.upsert(AccountSeed);
  const adminUserSeed = await prisma.user.upsert(AdminUserSeed);
  const testUserSeed = await prisma.user.upsert(TestUserSeed);
  const dashboardSeed = await prisma.menu.upsert({
    where: { id: 1 },
    update: {},
    create: {
      path: '/dashboard',
      name: 'Dashboard',
      component: 'LAYOUT',
      redirect: '/dashboard/analysis',
      meta: {
        create: {
          title: 'routes.dashboard.dashboard',
          icon: 'bx:bx-home',
        },
      },
    },
  });

  const dashboardChildrenSeed1 = await prisma.menu.upsert({
    where: { id: 2 },
    update: {},
    create: {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index',
      meta: {
        create: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: 'routes.dashboard.analysis',
          currentActiveMenu: '/dashboard',
          icon: 'bx:bx-home',
        },
      },
      parentId: dashboardSeed.id,
    },
  });

  const dashboardChildrenSeed2 = await prisma.menu.upsert({
    where: { id: 3 },
    update: {},
    create: {
      path: '/dashboard',
      name: 'Dashboard',
      component: 'LAYOUT',
      redirect: '/dashboard/analysis',
      meta: {
        create: {
          title: 'routes.dashboard.dashboard',
          icon: 'bx:bx-home',
        },
      },
      parentId: dashboardSeed.id,
    },
  });

  const authRouteSeed = await prisma.menu.upsert({
    where: { id: 4 },
    update: {},
    create: {
      path: '/permission',
      name: 'Permission',
      component: 'LAYOUT',
      redirect: '/permission/front/page',
      meta: {
        create: {
          icon: 'carbon:user-role',
          title: 'routes.demo.permission.permission',
        },
      },
    },
  });

  const backSeed = await prisma.menu.upsert({
    where: { id: 5 },
    update: {},
    create: {
      path: 'back',
      name: 'PermissionBackDemo',
      meta: {
        create: {
          title: 'routes.demo.permission.back',
        },
      },
      parentId: authRouteSeed.id,
    },
  });

  const backSeedSeed2 = await prisma.menu.upsert({
    where: { id: 6 },
    update: {},
    create: {
      path: 'page',
      name: 'BackAuthPage',
      component: '/demo/permission/back/index',
      meta: {
        create: {
          title: 'routes.demo.permission.backPage',
        },
      },
      parentId: backSeed.id,
    },
  });

  const backSeedSeed3 = await prisma.menu.upsert({
    where: { id: 7 },
    update: {},
    create: {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/demo/permission/back/Btn',
      meta: {
        create: {
          title: 'routes.demo.permission.backBtn',
        },
      },
      parentId: backSeed.id,
    },
  });

  const levelSeed = await prisma.menu.upsert({
    where: { id: 8 },
    update: {},
    create: {
      path: '/level',
      name: 'Level',
      component: 'LAYOUT',
      redirect: '/level/menu1/menu1-1/menu1-1-1',
      meta: {
        create: {
          icon: 'carbon:user-role',
          title: 'routes.demo.level.level',
        },
      },
    },
  });

  const menu1Seed = await prisma.menu.upsert({
    where: { id: 9 },
    update: {},
    create: {
      path: 'menu1',
      name: 'Menu1',
      meta: {
        create: {
          title: 'Menu1',
        },
      },
      parentId: levelSeed.id,
    },
  });

  const menu11Seed = await prisma.menu.upsert({
    where: { id: 10 },
    update: {},
    create: {
      path: 'menu1-1',
      name: 'Menu1-1',
      meta: {
        create: {
          title: 'Menu1-1',
        },
      },
      parentId: menu1Seed.id,
    },
  });

  const menu111Seed = await prisma.menu.upsert({
    where: { id: 11 },
    update: {},
    create: {
      path: 'menu1-1-1',
      name: 'Menu1-1-1',
      component: '/demo/level/Menu111',
      meta: {
        create: {
          title: 'Menu111',
        },
      },
      parentId: menu11Seed.id,
    },
  });

  const menu12Seed = await prisma.menu.upsert({
    where: { id: 12 },
    update: {},
    create: {
      path: 'menu1-2',
      name: 'Menu1-2',
      component: '/demo/level/Menu12',
      meta: {
        create: {
          title: 'Menu1-2',
        },
      },
      parentId: menu1Seed.id,
    },
  });

  const menu2Seed = await prisma.menu.upsert({
    where: { id: 13 },
    update: {},
    create: {
      path: 'menu2',
      name: 'Menu2',
      component: '/demo/level/Menu2',
      meta: {
        create: {
          title: 'Menu2',
        },
      },
      parentId: levelSeed.id,
    },
  });

  const systemSeed = await prisma.menu.upsert({
    where: { id: 14 },
    update: {},
    create: {
      path: '/system',
      name: 'System',
      component: 'LAYOUT',
      redirect: '/system/account',
      meta: {
        create: {
          title: 'routes.demo.system.moduleName',
          icon: 'ion:settings-outline',
        },
      },
    },
  });

  const accountManagementSeed = await prisma.menu.upsert({
    where: { id: 15 },
    update: {},
    create: {
      path: 'account',
      name: 'AccountManagement',
      component: '/demo/system/account/index',
      meta: {
        create: {
          title: 'routes.demo.system.account',
          ignoreKeepAlive: true,
        },
      },
      parentId: systemSeed.id,
    },
  });

  const accountDetailSeed = await prisma.menu.upsert({
    where: { id: 16 },
    update: {},
    create: {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      component: '/demo/system/account/AccountDetail',
      meta: {
        create: {
          title: 'routes.demo.system.account_detail',
          ignoreKeepAlive: true,
          hideMenu: true,
          showMenu: false,
          currentActiveMenu: '/system/account',
        },
      },
      parentId: systemSeed.id,
    },
  });

  const roleManagementSeed = await prisma.menu.upsert({
    where: { id: 17 },
    update: {},
    create: {
      path: 'role',
      name: 'RoleManagement',
      component: '/demo/system/role/index',
      meta: {
        create: {
          title: 'routes.demo.system.role',
          ignoreKeepAlive: true,
        },
      },
      parentId: systemSeed.id,
    },
  });

  const menuManagementSeed = await prisma.menu.upsert({
    where: { id: 18 },
    update: {},
    create: {
      path: 'menu',
      name: 'MenuManagement',
      component: '/demo/system/menu/index',
      meta: {
        create: {
          title: 'routes.demo.system.menu',
          ignoreKeepAlive: true,
        },
      },
      parentId: systemSeed.id,
    },
  });

  const deptManagementSeed = await prisma.menu.upsert({
    where: { id: 19 },
    update: {},
    create: {
      path: 'dept',
      name: 'DeptManagement',
      component: '/demo/system/dept/index',
      meta: {
        create: {
          title: 'routes.demo.system.dept',
          ignoreKeepAlive: true,
        },
      },
      parentId: systemSeed.id,
    },
  });

  const changePasswordSeed = await prisma.menu.upsert({
    where: { id: 20 },
    update: {},
    create: {
      path: 'changePassword',
      name: 'ChangePassword',
      component: '/demo/system/password/index',
      meta: {
        create: {
          title: 'routes.demo.system.password',
          ignoreKeepAlive: true,
        },
      },
      parentId: systemSeed.id,
    },
  });

  const linkSeed = await prisma.menu.upsert({
    where: { id: 21 },
    update: {},
    create: {
      path: '/link',
      name: 'Link',
      component: 'LAYOUT',
      meta: {
        create: {
          icon: 'ion:tv-outline',
          title: 'routes.demo.iframe.frame',
        },
      },
    },
  });

  const linkChildrenSeed1 = await prisma.menu.upsert({
    where: { id: 22 },
    update: {},
    create: {
      path: 'doc',
      name: 'Doc',
      component: '/demo/iframe/index',
      meta: {
        create: {
          title: 'routes.demo.iframe.doc',
          frameSrc: 'https://doc.vvbin.cn/',
        },
      },
      parentId: linkSeed.id,
    },
  });

  const linkChildrenSeed2 = await prisma.menu.upsert({
    where: { id: 23 },
    update: {},
    create: {
      path: 'https://doc.vvbin.cn/',
      name: 'DocExternal',
      component: 'LAYOUT',
      meta: {
        create: {
          title: 'routes.demo.iframe.docExternal',
        },
      },
      parentId: linkSeed.id,
    },
  });

  console.log({
    accountSeed,
    adminUserSeed,
    testUserSeed,
    dashboardSeed,
    dashboardChildrenSeed1,
    dashboardChildrenSeed2,
    authRouteSeed,
    backSeed,
    backSeedSeed2,
    backSeedSeed3,
    levelSeed,
    menu1Seed,
    menu11Seed,
    menu111Seed,
    menu12Seed,
    menu2Seed,
    systemSeed,
    accountManagementSeed,
    accountDetailSeed,
    roleManagementSeed,
    menuManagementSeed,
    deptManagementSeed,
    changePasswordSeed,
    linkSeed,
    linkChildrenSeed1,
    linkChildrenSeed2,
  });
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
