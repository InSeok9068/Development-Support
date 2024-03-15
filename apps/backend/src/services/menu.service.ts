import { prisma } from '@/configs';
import { MenuPermissionInput, MenuPermissionResponse, MenusInput, Role } from '@support/shared/types';
import { parseRole } from '@support/shared/types/pares';

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

const menuPermission = async (input: MenuPermissionInput, role: Role) => {
  const menu = await prisma.menu.findFirstOrThrow({
    where: {
      to: input.to,
    },
    include: {
      menuRoles: true,
    },
  });

  let hasAccess = false;
  hasAccess = menu.menuRoles.length === 0;
  if (!hasAccess) {
    hasAccess = !hasAccess && menu.menuRoles.some((menu) => menu.roleId === parseRole(role));
  }

  return {
    hasAccess,
    message: !hasAccess ? '접근 불가능합니다.' : '',
  } as MenuPermissionResponse;
};

export { menuPermission, menus };
