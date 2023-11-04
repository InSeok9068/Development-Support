import puppeteer from 'puppeteer';
import { NaverJobScraping } from '../src/service/job.scrap.service';

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    'https://recruit.navercorp.com/rcrt/list.do?subJobCdArr=1010004%2C1010005%2C1060001&sysCompanyCdArr=KR%2CNB%2CWM%2CSN%2CNL%2CWTKR%2CNFN%2CNI&empTypeCdArr=0010&entTypeCdArr=0020&workAreaCdArr=0010%2C0020&sw=&subJobCdData=1010004&subJobCdData=1010005&subJobCdData=1060001&sysCompanyCdData=KR&sysCompanyCdData=NB&sysCompanyCdData=WM&sysCompanyCdData=SN&sysCompanyCdData=NL&sysCompanyCdData=WTKR&sysCompanyCdData=NFN&sysCompanyCdData=NI&empTypeCdData=0010&entTypeCdData=0020&workAreaCdData=0010&workAreaCdData=0020',
  );
  await delay(1000);
  const naverJobScraping = new NaverJobScraping('NAVER', page);
  console.log(await naverJobScraping.getLinks());
  await browser.close();
})();
