import { GeekNewsScrap } from '@/services/scraps/geeknews.scrap.service';
import { delay } from '@support/shared/utils/time.util';
import { CronJob } from 'cron';
import puppeteer from 'puppeteer';

const newsletterScrapAction = () => {
  ['GeekNews'].forEach(async (source) => {
    switch (source) {
      case 'GeekNews': {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const geekNewsScrap = new GeekNewsScrap(source, page);
        await page.goto(geekNewsScrap.getHomeUrl());
        delay(500);
        await geekNewsScrap.scrapTitle();
        await geekNewsScrap.scrapSourceUniqueKey();
        await geekNewsScrap.scrapSourceLink();
        await geekNewsScrap.scrapOriginLink();
        await geekNewsScrap.saveNewsletterScrap();
        await browser.close();
        break;
      }
      default:
        break;
    }
  });
};

// 매일마다 아침 9시에 동작
const newsletterScrapSchedule = new CronJob('0 9 * * * *', newsletterScrapAction, null, true, 'Asia/Seoul');

export { newsletterScrapSchedule };
