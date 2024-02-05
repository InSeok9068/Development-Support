import { menus } from '@/services/menu.service';
import { QueryMenusArgs } from '@support/shared/types';

const resolvers = {
  Query: {
    menus: async (_: unknown, args: QueryMenusArgs) => {
      return await menus(
        args.input ?? {
          uid: '',
        },
      );
    },
  },
};

export { resolvers };
