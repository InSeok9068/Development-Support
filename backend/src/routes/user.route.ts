import { Request, Response, Router } from 'express';
import { getUser } from '../services';

const userRoute = Router();

userRoute.get('/users/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
});

export { userRoute };
