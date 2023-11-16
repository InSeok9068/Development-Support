import winston from 'winston';
import 'winston-daily-rotate-file';

// winstrom 설정
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile({
    level: 'error',
    filename: `logs/%DATE%_error.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: 30,
  }),
  new winston.transports.DailyRotateFile({
    filename: `logs/%DATE%_all.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxFiles: 14,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export { logger };
