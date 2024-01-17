import puppeteer from 'puppeteer';

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://pms.kpcard.co.kr/projects/palrago/issues');
  await browser.close();
})();
