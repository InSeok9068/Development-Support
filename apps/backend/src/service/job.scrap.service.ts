import { JobScrap, JobScraping } from '@/types/job.scrap.type';
import { Page } from 'puppeteer';

class NaverJobScraping implements JobScraping {
  private page: Page;
  private jobscrap: JobScrap;

  constructor(page: Page) {
    this.page = page;
    this.jobscrap = {} as JobScrap;
  }

  scrapCompany(): string {
    return '';
  }

  scrapPosition(): string {
    return '';
  }

  scrapRequirement(): string {
    return '';
  }

  scrapStratDate(): string {
    return '';
  }

  scrapEndDate(): string {
    return '';
  }

  getJobScrap(): JobScrap {
    return this.jobscrap;
  }
}
