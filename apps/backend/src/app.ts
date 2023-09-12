import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import { createHandler } from 'graphql-http/lib/use/express';
import helmet from 'helmet';
import passport from 'passport';
import path from 'path';
import { logger, passportConfigInit } from './configs';
import { schema } from './graphql/schema';
import { errorMiddleware, morganMiddleware } from './middlewares';

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
app.use(
  session({
    secret: process.env.PASSPORT_SECRET as string,
    resave: false, // fasle 권장
    saveUninitialized: false, // fasle 권장
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passportConfigInit();

app.all('/graphql', createHandler({ schema }));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  logger.info('App Start');
  console.log(`[server]: Server is running at <http://localhost:${port}>`);
  // consoleSchedule;
});
