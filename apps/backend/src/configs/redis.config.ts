import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
  await client.connect();
})();

export { client };
