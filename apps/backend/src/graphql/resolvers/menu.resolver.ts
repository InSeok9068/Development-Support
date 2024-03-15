import { CustomContext } from '@/graphql/custom.context';
import { menuPermission, menus } from '@/services/menu.service';
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
    menuPermission: async (_: unknown, args: QueryMenuPermissionArgs, ctx: CustomContext) => {
      return await menuPermission(args.input, ctx.role);
    },
  },
};

export { resolvers };
