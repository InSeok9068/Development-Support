import { Request, Response, Router } from "express";
import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import { getUser } from "../services";

const userRoute = Router();

userRoute.get("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  return pipe(
    getUser(id),
    TE.map((result) => res.json(result)),
    TE.mapLeft((result) => res.status(result.code).json(result.error)),
  )();
});

export { userRoute };
