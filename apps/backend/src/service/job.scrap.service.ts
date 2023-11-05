import { prisma } from '@/configs';
import { JobScrap } from '@/types/job.scrap.type';

const saveJobScrap = async (jobscrap: JobScrap) => {
  const jobScrap = await prisma.jobScrap.create({
    data: {
      ...jobscrap,
    },
  });

  return jobScrap;
};

export { saveJobScrap };
