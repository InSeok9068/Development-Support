import { redis } from '@/configs';
import { createNewsletter } from '@/services/newsletter.service';
import { Source } from '@support/shared/types';
import { delay } from '@support/shared/utils/time.util';
import { CronJob } from 'cron';
import puppeteer from 'puppeteer';

const newsletterScrapAction = async () => {
  for (const source of ['GEEK_NEWS']) {
    switch (source) {
      case Source.GeekNews: {
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://news.hada.io');
        await delay(500);
        const titleList = await page.$$eval('.topictitle > a > h1', (els) => els.map((el) => el.textContent ?? ''));
        const sourceLinkList = await page.$$eval('.topicdesc > a', (els) => els.map((el) => el.href));
        const sourceUniqueKeyList = sourceLinkList.map(
          (sourceLink) => source + '-' + sourceLink.match(/id=(\d+)$/)?.[1],
        );
        for (let i = 0; i < titleList.length; i++) {
          await createNewsletter({
            source,
            title: titleList[i],
            sourceLink: sourceLinkList[i],
            sourceUniqueKey: sourceUniqueKeyList[i],
          });
        }
        await browser.close();
        await redis.del(`newsletters:${args.input.source ?? ''}`);
        break;
      }
      default:
        break;
    }
  }
};

// 매일마다 아침 9시에 동작
const newsletterScrapSchedule = new CronJob('0 0 9 * * *', newsletterScrapAction, null, true, 'Asia/Seoul');

export { newsletterScrapAction, newsletterScrapSchedule };
