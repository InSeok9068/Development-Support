import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { logger, morganMiddleware } from './configs';
import { passportConfigInit } from './configs/passport.config';
import { userRoute } from './routes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Express = express();
const port = process.env.PORT || 4000;

// 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morganMiddleware);
app.use(
  session({
    secret: process.env.PASSPORT_SECURT as string,
    resave: false, // fasle 권장
    saveUninitialized: false, // fasle 권장
  }),
);
app.use(passport.initialize());
app.use(passport.session());
passportConfigInit();

// Route
app.use(userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Functional Programing + Express Server');
});

app.listen(port, () => {
  logger.info('App Start');
  console.log(`[server]: Server is running at <http://localhost:${port}>`);
});
