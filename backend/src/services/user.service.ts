import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as E from "fp-ts/Either";
import * as db from "../models";
import { errorUtil } from "../utils";

const getUser = (id: number) => {
  return pipe(
    TE.tryCatch(() => db.getUserDB(id), E.toError),
    TE.map((user) => user),
    TE.mapLeft(errorUtil.getError),
  );
};

export { getUser };
