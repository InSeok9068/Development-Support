import { CronJob } from 'cron';

const consoleAction = () => {
  console.log('테스트');
};

const consoleSchedule = new CronJob('* * * * * *', consoleAction, null, true, 'Asia/Seoul');

export { consoleSchedule };
