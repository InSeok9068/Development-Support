import * as db from '../models';

const getUser = (id: number) => db.getUserDB(id);

export { getUser };
