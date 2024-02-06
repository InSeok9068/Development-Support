import { Role } from '.';

export const parseRole = (role: Role): number => {
  switch (role) {
    case Role.Admin:
      return 1;
    case Role.User:
      return 2;
    case Role.Guest:
      return 3;
    default:
      throw new Error('Invalid ROLE value');
  }
};
