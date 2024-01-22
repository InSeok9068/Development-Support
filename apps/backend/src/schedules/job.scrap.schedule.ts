import { saveJobScrap } from '@/services/job.scrap.service';
import { NaverJobScraping } from '@/services/scraps';
import { delay } from '@support/shared/utils/time.util';
import { CronJob } from 'cron';
import puppeteer from 'puppeteer';

interface Site {
  company: string;
  url: string;
}

const sites: Site[] = [
  {
    company: 'NAVER',
    url: 'https://recruit.navercorp.com/rcrt/list.do?subJobCdArr=1010004%2C1060001&sysCompanyCdArr=KR%2CNB%2CWM%2CSN%2CNL%2CWTKR%2CNFN%2CNI&empTypeCdArr=0010&entTypeCdArr=0020&workAreaCdArr=0010%2C0020&sw=&subJobCdData=1010004&subJobCdData=1060001&sysCompanyCdData=KR&sysCompanyCdData=NB&sysCompanyCdData=WM&sysCompanyCdData=SN&sysCompanyCdData=NL&sysCompanyCdData=WTKR&sysCompanyCdData=NFN&sysCompanyCdData=NI&empTypeCdData=0010&entTypeCdData=0020&workAreaCdData=0010&workAreaCdData=0020',
  },
];

const jobPostingAction = () => {
  sites.forEach(async (site) => {
    switch (site.company) {
      case 'NAVER':
        {
          const browser = await puppeteer.launch({ headless: false });
          const page = await browser.newPage();
          await page.goto(site.url);
          await delay(1000);
          const jobScraping = new NaverJobScraping(site.company, page);
          const links = await jobScraping.getLinks();
          for (let i = 0; i < links.length; i++) {
            const links = await jobScraping.getLinks();
            await links[i].click();
            await jobScraping.scrapTitle();
            await jobScraping.scrapPosition();
            await jobScraping.scrapRequirement();
            await jobScraping.scrapStratDate();
            await jobScraping.scrapEndDate();
            await jobScraping.scrapLink();
            await saveJobScrap(jobScraping.getJobScrap());
            await page.goBack();
            await delay(1000);
          }
          await browser.close();
        }
        break;
      default:
        break;
    }
  });
};

// 3일마다 아침 9시에 동작
const jobPostingSchedule = new CronJob('0 9 */3 * * *', jobPostingAction, null, true, 'Asia/Seoul');

export { jobPostingSchedule };
