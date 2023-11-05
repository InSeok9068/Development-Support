import { prisma } from '@/configs';
import { JobScrap } from '@/types/job.scrap.type';

const saveJobScrap = async (jobScrap: JobScrap) => {
  const count = await prisma.jobScrap.count({
    where: {
      company: jobScrap.company,
      linkId: jobScrap.linkId,
    },
  });

  const createJobScrap =
    count === 0 &&
    (await prisma.jobScrap.create({
      data: {
        ...jobScrap,
      },
    }));

  return createJobScrap;
};

export { saveJobScrap };
