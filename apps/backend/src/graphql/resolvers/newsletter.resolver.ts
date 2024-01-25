import { newsletterScrapAction } from '@/schedules/newsletter.scrap.schedule';
import { newsletters } from '@/services/newsletter.service';
import { QueryNewslettersArgs } from '@support/shared/types';
import { delay } from '@support/shared/utils/time.util';

const resolvers = {
  Query: {
    newsletters: async (_: unknown, args: QueryNewslettersArgs) => {
      return await newsletters(args.input);
    },
  },

  Mutation: {
    nowScrapingNewsletters: async (_: unknown) => {
      await delay(2000);
      await newsletterScrapAction();
    },
  },
};

export { resolvers };
