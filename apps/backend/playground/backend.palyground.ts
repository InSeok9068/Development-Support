import puppeteer from 'puppeteer';

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://news.hada.io');
  await delay(500);
  console.log(
    await page.$$eval('.topictitle > a', (el) =>
      el.map((el) => ({
        title: el.textContent,
        link: el.getAttribute('href'),
      })),
    ),
  );
  await browser.close();
})();
