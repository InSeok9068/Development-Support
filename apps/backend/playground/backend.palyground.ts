import puppeteer from 'puppeteer';

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    'https://recruit.navercorp.com/rcrt/view.do?annoId=30001414&sw=&subJobCdArr=1010001%2C1010002%2C1010003%2C1010004%2C1010005%2C1010006%2C1010007%2C1010008%2C1010020%2C1020001%2C1030001%2C1030002%2C1040001%2C1050001%2C1050002%2C1060001&sysCompanyCdArr=&empTypeCdArr=&entTypeCdArr=&workAreaCdArr=',
  );
  delay(1000);
  // await page.$eval('#annoId', (el) => console.log(el));
  const linkId = await page.$eval('input[name="annoId"]', ({ value }) => value);
  console.log(linkId);
  // const linkId = await page.waitForSelector('#annoId');
  await browser.close();
})();
