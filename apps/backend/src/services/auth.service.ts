import { Role, User } from '@support/shared/types';

const adminEmail = ['dlstjr9068@gmail.com'];

const getUserRole = async (user: User) => {
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
