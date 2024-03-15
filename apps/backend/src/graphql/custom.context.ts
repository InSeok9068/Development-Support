import { admin } from '@/configs';
import { getUserRole } from '@/services/auth.service';
import { Role } from '@support/shared/types';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { YogaInitialContext } from 'graphql-yoga';

export interface CustomContext extends YogaInitialContext {
  uid: string;
  user?: UserRecord;
  role: Role;
}

const customContext = async (ctx: YogaInitialContext) => {
  const uid = ctx.request.headers.get('uid') ?? '';
  let role: Role = Role.Guest;
  let user;
  if (uid) {
    user = await admin.auth().getUser(uid);
    role = await getUserRole(user);
  }

  return {
    uid,
    user,
    role,
  };
};

export { customContext as context };
