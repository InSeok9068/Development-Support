import { newsletters } from '@/services/newsletter.service';
import { QueryNewslettersArgs } from '@support/shared/types';

const resolvers = {
  Query: {
    newsletters: async (_: unknown, args: QueryNewslettersArgs) => {
      return await newsletters(args.input);
    },
  },
};

export { resolvers };
