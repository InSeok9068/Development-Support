import * as db from '../models';
import { UserDto } from '../types/user.type';

const getUser = (id: number) => db.getUserDB(id);

export { getUser };
