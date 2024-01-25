import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.JOB_SCRAP_ALERT_TELEGRAM_TOKEN as string, { polling: true });

export { bot };
