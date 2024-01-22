import { prisma } from '@/configs';
import { CreateNewsletterInput, NewslettersInput } from '@support/shared/types';

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

const createNewsletter = async (input: CreateNewsletterInput) => {
  const saveNewsletter = async (input: CreateNewsletterInput) => {
    return await prisma.newsletterScrap.create({
      data: {
        title: input.title,
        source: input.source,
        sourceUniqueKey: input.sourceUniqueKey,
        sourceLink: input.sourceLink,
        originLink: input.originLink,
      },
    });
  };

  if (input.sourceUniqueKey) {
    const count = await prisma.newsletterScrap.count({
      where: {
        sourceUniqueKey: input.sourceUniqueKey,
      },
    });

    if (count === 0) {
      return await saveNewsletter(input);
    }
  } else {
    return await saveNewsletter(input);
  }
};

export { createNewsletter, newsletters };
