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

const isAdmin = async (uid: string) => Role.Admin === (await getUserRole(uid));

const isUser = async (uid: string) => Role.User === (await getUserRole(uid));

const isGuest = async (uid: string) => Role.Guest === (await getUserRole(uid));

export { getUserRole, isAdmin, isGuest, isUser };
