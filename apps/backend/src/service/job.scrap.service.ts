import { JobScrap, JobScraping } from '@/types/job.scrap.type';
import { Page } from 'puppeteer';

class NaverJobScraping implements JobScraping {
  private page: Page;
  private jobscrap: JobScrap;

  constructor(company: string, page: Page) {
    this.page = page;
    this.jobscrap = {} as JobScrap;
    this.jobscrap.company = company;
  }

  async scrapTitle() {
    const cardTitle = await this.page.$$eval('h4.card_title', (el) => el.map((el) => el.textContent));
  }

  async scrapPosition() {}

  async scrapRequirement() {}

  async scrapStratDate() {}

  async scrapEndDate() {}

  getJobScrap(): JobScrap {
    return this.jobscrap;
  }
}

export { NaverJobScraping };
