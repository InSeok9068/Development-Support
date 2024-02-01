import { redis } from '@/configs';
import { newsletterScrapAction } from '@/schedules/newsletter.scrap.schedule';
import { newsletters } from '@/services/newsletter.service';
import { NewsletterScrap } from '@prisma/client';
import { QueryNewslettersArgs } from '@support/shared/types';

const resolvers = {
  Query: {
    newsletters: async (_: unknown, args: QueryNewslettersArgs) => {
      const resultCache = await redis.get(`newsletters:${args.input.source ?? ''}`);
      if (resultCache) {
        return JSON.parse(resultCache) as NewsletterScrap[];
      }

      const result = await newsletters(args.input);

      await redis.set(`newsletters:${args.input.source ?? ''}`, JSON.stringify(result), {
        EX: 3600,
      });

      return result;
    },
  },

  Mutation: {
    nowScrapingNewsletters: async (_: unknown) => {
      await newsletterScrapAction();
    },
  },
};

export { resolvers };
