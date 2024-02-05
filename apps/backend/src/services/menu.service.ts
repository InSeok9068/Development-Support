import { prisma } from '@/configs';
import { MenuPermissionInput, MenuPermissionResponse, MenusInput } from '@support/shared/types';

const menus = async (input: MenusInput) => {
  const menus = await prisma.menu.findMany({
    where: {
      parentId: null, // 최상위 메뉴 항목만 조회
    },
    include: {
      children: {
        include: {
          children: true,
          menuRoles: {
            include: {
              role: true,
            },
          },
        },
      },
      menuRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  return menus;
};

const menuPermission = async (input: MenuPermissionInput) => {
  const menu = await prisma.menu.findMany({
    where: {
      to: input.to,
    },
  });

  return {
    hasAccess: !!menu,
  } as MenuPermissionResponse;
};

export { menuPermission, menus };
