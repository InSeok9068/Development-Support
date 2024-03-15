import { Role } from '@support/shared/types';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

const adminEmail = ['dlstjr9068@gmail.com'];

const getUserRole = async (user: UserRecord) => {
  if (user) {
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
