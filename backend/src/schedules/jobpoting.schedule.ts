import axios from 'axios';
import { load } from 'cheerio';
import { CronJob } from 'cron';
import puppeteer from 'puppeteer';

type LANDING_TYPE = 'SPA' | 'SSR';

interface Site {
  name: string;
  url: string;
  landingType: LANDING_TYPE;
}

const siteList: Site[] = [
  {
    name: 'LINE',
    url: 'https://careers.linecorp.com/ko/jobs?ca=All&ci=Bundang&co=East%20Asia&fi=Web%20Development,Server-side&ty=Full-time',
    landingType: 'SPA',
  },
  {
    name: 'WOOWAHAN',
    url: 'https://career.woowahan.com/?jobCodes=BA007001&employmentTypeCodes=BA002001&serviceSectionCodes=&careerPeriod=&keyword=&category=jobGroupCodes%3ABA005001#recruit-list',
    landingType: 'SPA',
  },
  {
    name: 'COUPANG',
    url: 'https://www.coupang.jobs/kr/jobs/?search=Back&location=South+Korea&pagesize=20#results',
    landingType: 'SSR',
  },
];

const siteScraping = () => {
  siteList.forEach(async (site) => {
    switch (site.name) {
      case 'LINE':
        {
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.goto(site.url);
          await delay(1000);
          const jobList = await page.$$eval('h3.title', (el) => el.map((el) => el.textContent));
          await browser.close();
        }
        break;
      case 'WOOWAHAN':
        {
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.goto(site.url);
          await delay(1000);
          const jobList = await page.$$eval('p.fr-view', (el) => el.map((el) => el.textContent));
          await browser.close();
        }
        break;
      case 'COUPANG':
        {
          const { data } = await axios.get(site.url);
          const $ = load(data);
          const jobList = $('.job-listing .stretched-link');
          console.log(`[${site.name}] ${jobList.text()}`);
        }
        break;
      default:
        break;
    }
  });
};

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const jobPostingAction = () => {
  siteScraping();
};

const jobPostingSchedule = new CronJob('* * * * * *', jobPostingAction, null, true, 'Asia/Seoul');

export { jobPostingSchedule };
