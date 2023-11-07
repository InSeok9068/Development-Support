import { logger } from '@/configs';
import { schema } from '@/graphql/schema';
import { authMiddleware, errorMiddleware, limiterMiddleware, morganMiddleware } from '@/middlewares';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import helmet from 'helmet';
import path from 'path';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Express = express();
const port = process.env.PORT || 4000;

// 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use('/assets', express.static('public/assets'));
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.use(morganMiddleware);
app.use(errorMiddleware);

app.all('/graphql', [authMiddleware, limiterMiddleware], createHandler({ schema }));

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  logger.info('App Start');
  console.log(`[server]: Server is running at <http://localhost:${port}>`);
});
