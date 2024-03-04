import { createClient } from 'redis';
import { logger } from './logger.config';

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const redis = createClient({
  url: process.env.REDIS_URL,
  pingInterval: 10000,
});

(async () => {
  await redis.connect();
})();

redis.on('error', (err) => logger.info(`redis error ${err}`));
redis.on('connect', () => logger.info('redis connect'));
redis.on('reconnecting', () => logger.info('redis reconnecting'));
redis.on('ready', () => logger.info('redis ready'));

export { connection, redis };
