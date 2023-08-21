import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { userRoute } from './routes';
import { logger, morganMiddleware } from './configs';

const app: Express = express();
const port = process.env.PORT || 3000;

// 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morganMiddleware);

// Route
app.use(userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Functional Programing + Express Server');
});

app.listen(port, () => {
  logger.info('App Start');
  console.log(`[server]: Server is running at <http://localhost:${port}>`);
});
