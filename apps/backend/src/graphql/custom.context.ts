import { admin } from '@/configs';
import { getUserRole } from '@/services/auth.service';
import { Role, User } from '@support/shared/types';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { YogaInitialContext } from 'graphql-yoga';

export interface CustomContext extends YogaInitialContext {
  uid: string;
  user?: UserRecord;
  role: Role;
}

const customContext = async (ctx: YogaInitialContext) => {
  const authorization = ctx.request.headers.get('authorization');

  let uid = '';
  let user: User | null = null;
  let role: Role = Role.Guest;

  if (authorization) {
    const decodedToken = await admin.auth().verifyIdToken(authorization);
    user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      phoneNumber: decodedToken.phone_number,
      createdAt: '',
      updatedAt: '',
    };
    uid = user.uid;
    role = await getUserRole(user);
  }

  return {
    uid,
    user,
    role,
  };
};

export { customContext as context };
