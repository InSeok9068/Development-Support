import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import path from 'path';
import { logger } from './configs';
import { passportConfigInit } from './configs/passport.config';
import { morganMiddleware } from './middlewares';
import { userRoute } from './routes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenv.config({ path: `.env.secret.${process.env.NODE_ENV}` });

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
app.use(morganMiddleware);
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

const a = 1;

// Route
app.use(userRoute);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  logger.info('App Start');
  console.log(`[server]: Server is running at <http://localhost:${port}>`);
  // consoleSchedule;
});
