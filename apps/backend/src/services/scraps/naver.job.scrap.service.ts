import { JobScrap, JobScraping } from '@/types/job.scrap.type';
import dayjs from 'dayjs';
import { Page } from 'puppeteer';

class NaverJobScraping implements JobScraping {
  private page: Page;
  private jobScrap: JobScrap;

  constructor(company: string, page: Page) {
    this.page = page;
    this.jobScrap = {} as JobScrap;
    this.jobScrap.company = company;
  }

  async scrapTitle() {
    const title = await this.page.$eval('h4.card_title', (el) => el.textContent);
    this.jobScrap.title = title ?? '';
  }

  async scrapPosition() {
    const infos = await this.page.$$eval('dd.info_text', (el) => el.map((el) => el.textContent));
    this.jobScrap.position = (infos[2] ?? '').replace(/\t/g, '').replace(/\n/g, '').trim();
  }

  async scrapRequirement() {}

  async scrapStratDate() {
    const infos = await this.page.$$eval('dd.info_text', (el) => el.map((el) => el.textContent));
    const date = infos[5];
    this.jobScrap.stratDate = dayjs(
      date!
        .split('~')
        .map((date) => (date.includes('(') ? date.substring(0, date.indexOf('(')) : date))
        .map((date) => date.trim())[0],
    ).toDate();
  }

  async scrapEndDate() {
    const infos = await this.page.$$eval('dd.info_text', (el) => el.map((el) => el.textContent));
    const date = infos[5];
    this.jobScrap.endDate = dayjs(
      date!
        .split('~')
        .map((date) => (date.includes('(') ? date.substring(0, date.indexOf('(')) : date))
        .map((date) => date.trim())[1],
    ).toDate();
  }

  async scrapLink(): Promise<void> {
    this.jobScrap.link = this.page.url();
  }

  async scrapLinkId(): Promise<void> {
    this.jobScrap.linkId = await this.page.$eval('input[name="annoId"]', ({ value }) => value);
  }

  getJobScrap(): JobScrap {
    return this.jobScrap;
  }

  async getLinks() {
    return await this.page.$$('a.card_link');
  }
}

export { NaverJobScraping };
