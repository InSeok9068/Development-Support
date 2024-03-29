/* dotenv Setting */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`) });
/* dotenv Setting */

import { logger } from '@/configs';
import { context } from '@/graphql/custom.context';
import { schema } from '@/graphql/schema';
import {
  authMiddleware,
  errorMiddleware,
  limiterMiddleware,
  morganMiddleware,
  permissionMiddleware,
} from '@/middlewares';
import { newsletterScrapSchedule } from '@/schedules/newsletter.scrap.schedule';
import { EnvelopArmor } from '@escape.tech/graphql-armor';
import { timeUtil } from '@support/shared/utils/time.util';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { applyMiddleware } from 'graphql-middleware';
import { createYoga } from 'graphql-yoga';
import helmet from 'helmet';

const app: Express = express();
const port = process.env.PORT || 4000;
const armor = new EnvelopArmor();
const protection = armor.protect();
const yoga = createYoga({
  schema: applyMiddleware(schema, permissionMiddleware),
  context,
  plugins: [...protection.plugins],
});

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
app.use('/layout', express.static('public/layout'));
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.use(morganMiddleware);
app.use(errorMiddleware);
app.use(yoga.graphqlEndpoint, [limiterMiddleware, authMiddleware], yoga);

app.get('/logs', limiterMiddleware, (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, `../logs/${timeUtil.today('YYYY-MM-DD')}_all.log`));
});

app.get('/health', (_req, res) => res.send('OK'));

app.get('/*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  // 스케줄 실행 START
  newsletterScrapSchedule;
  // 스케줄 실행 END
  logger.info('App Start');
  console.log(`[server]: Server is running at <http://localhost:${port}>`);
});
