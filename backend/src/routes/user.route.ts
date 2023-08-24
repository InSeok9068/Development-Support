import { Request, Response, Router } from 'express';
import { getUser } from '../services';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRoute = Router();

userRoute.get('/users/:id', authMiddleware, async (req: Request, res: Response) =>
  res.json(getUser(Number(req.params.id))),
);

export { userRoute };
