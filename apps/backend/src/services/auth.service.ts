import { admin } from '@/configs';
import { Role } from '@support/shared/types';

const adminEmail = ['dlstjr9068@gmail.com'];

const getUserRole = async (uid: string) => {
  if (uid) {
    const user = await admin.auth().getUser(uid);
    if (user) {
      if (adminEmail.includes(user.email!)) {
        return Role.Admin;
      } else {
        return Role.User;
      }
    } else {
      return Role.Guest;
    }
  } else {
    return Role.Guest;
  }
};

export { getUserRole };
