const AdminUserSeed = {
  where: { userId: '1' },
  update: {},
  create: {
    userId: '1',
    username: 'dlstjr9068',
    realName: 'Lee In Seok',
    avatar: '',
    desc: 'manager',
    password: '9068',
    token: 'fakeToken1',
    homePath: '/dashboard/analysis',
    roles: {
      create: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
  },
};

export { AdminUserSeed };
