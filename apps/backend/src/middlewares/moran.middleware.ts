import morgan, { StreamOptions } from 'morgan';
import { logger } from '../configs';

// morgan 설정
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', { stream, skip });

export { morganMiddleware };
