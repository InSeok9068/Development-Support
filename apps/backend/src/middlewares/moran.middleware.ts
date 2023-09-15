import { logger } from '@/configs';
import { Request } from 'express';
import morgan, { StreamOptions } from 'morgan';

// morgan 설정
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

morgan.token('body', (req: Request) => {
  return JSON.stringify(req.body);
});

const morganMiddleware = morgan(':method :url :body :status - :response-time ms', {
  stream,
  skip,
});

export { morganMiddleware };
