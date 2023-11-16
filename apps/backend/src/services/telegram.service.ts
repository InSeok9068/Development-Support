import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const bot = new TelegramBot(process.env.JOB_SCRAP_ALERT_TELEGRAM_TOKEN as string, { polling: true });

export { bot };
