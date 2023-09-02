import * as db from '../models';

const getUser = (id: number) => db.getUserById(id);

export { getUser };
