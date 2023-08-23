import { getCountByUserIdAndPassword } from '../models/login.model';

const login = async (userId: string, password: string): Promise<boolean> =>
  1 === (await getCountByUserIdAndPassword(userId, password));

export { login };
