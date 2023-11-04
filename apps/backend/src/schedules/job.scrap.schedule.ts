import { NaverJobScraping } from '@/service/job.scrap.service';
import { CronJob } from 'cron';
import puppeteer from 'puppeteer';

interface Site {
  company: string;
  url: string;
}

const sites: Site[] = [
  {
    company: 'NAVER',
    url: 'https://recruit.navercorp.com/rcrt/list.do?subJobCdArr=1010004%2C1060001&sysCompanyCdArr=KR%2CNB%2CWM%2CSN%2CNL%2CWTKR%2CNFN%2CNI&empTypeCdArr=0010&entTypeCdArr=0020&workAreaCdArr=0010%2C0020&sw=&subJobCdData=1010004&subJobCdData=1060001&sysCompanyCdData=KR&sysCompanyCdData=NB&sysCompanyCdData=WM&sysCompanyCdData=SN&sysCompanyCdData=NL&sysCompanyCdData=WTKR&sysCompanyCdData=NFN&sysCompanyCdData=NI&empTypeCdData=0010&entTypeCdData=0020&workAreaCdData=0010&workAreaCdData=0020#n',
  },
];

const siteScraping = () => {
  sites.forEach(async (site) => {
    switch (site.company) {
      case 'NAVER':
        {
          const browser = await puppeteer.launch({ headless: true });
          const page = await browser.newPage();
          await page.goto(site.url);
          await delay(1000);
          const naverJobScraping = new NaverJobScraping(site.company, page);
          console.log(naverJobScraping.getLinks());
          await browser.close();
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
