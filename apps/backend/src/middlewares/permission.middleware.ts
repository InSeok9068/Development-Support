import { CustomContext } from '@/graphql/custom.context';
import { Role } from '@support/shared/types';
import { or, rule, shield } from 'graphql-shield';

const isAdmin = rule()((parent, args, ctx: CustomContext) => {
  return ctx.role === Role.Admin;
});

const isUser = rule()((parent, args, ctx: CustomContext) => {
  return ctx.role === Role.User;
});

const isGuest = rule()((parent, args, ctx: CustomContext) => {
  return ctx.role === Role.Guest;
});

const isAdminOrUser = or(isAdmin, isUser);

const permissionMiddleware = shield({
  Query: {},
  Mutation: {},
});

export { permissionMiddleware };
