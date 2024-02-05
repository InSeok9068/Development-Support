import { menuPermission, menus } from '@/services/menu.service';
import { getUid } from '@/utils/header.util';
import { QueryMenuPermissionArgs, QueryMenusArgs } from '@support/shared/types';

const resolvers = {
  Query: {
    menus: async (_: unknown, args: QueryMenusArgs) => {
      return await menus(
        args.input ?? {
          uid: '',
        },
      );
    },
    menuPermission: async (_: unknown, args: QueryMenuPermissionArgs, { headers }: { headers: any }) => {
      args.input.uid = getUid(headers);
      return await menuPermission(args.input);
    },
  },
};

export { resolvers };
