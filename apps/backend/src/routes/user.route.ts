import { Request, Response, Router } from 'express';
import { authMiddleware } from '../middlewares';
import { getUser } from '../services';

const userRoute = Router();

userRoute.get('/users/:id', authMiddleware, async (req: Request, res: Response) =>
  res.json(getUser(Number(req.params.id))),
);

export { userRoute };
