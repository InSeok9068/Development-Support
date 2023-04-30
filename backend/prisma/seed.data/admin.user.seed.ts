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

const TestUserSeed = {
  where: { userId: '2' },
  update: {},
  create: {
    userId: '2',
    username: 'test',
    password: '123456',
    realName: 'test user',
    avatar: '',
    desc: 'tester',
    token: 'fakeToken2',
    homePath: '/dashboard/workbench',
    roles: {
      create: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  },
};

export { AdminUserSeed, TestUserSeed };
