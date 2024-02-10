import { createClient } from 'redis';

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await redis.connect();
})();

export { connection, redis };
