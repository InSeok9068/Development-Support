import { CronJob } from 'cron';

const consoleSchedule = new CronJob(
  '* * * * * *',
  function () {
    console.log('테스트');
  },
  null,
  true,
  'Asia/Seoul',
);

export { consoleSchedule };
