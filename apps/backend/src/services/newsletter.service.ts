import { prisma } from '@/configs';
import { NewslettersInput } from '@support/shared/types';

const newsletters = async (input: NewslettersInput) => {
  if (input.source) {
    return await prisma.newsletterScrap.findMany({
      where: {
        source: input.source,
      },
    });
  } else {
    return await prisma.newsletterScrap.findMany();
  }
};

export { newsletters };
