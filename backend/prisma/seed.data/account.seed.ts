const AccountSeed = {
  where: { userid: "00000001" },
  update: {},
  create: {
    name: "Vben",
    userid: "00000001",
    email: "test@gmail.com",
    signature: "다양성을 포용하라, 포용은 미덕이다",
    introduction: "웃다, 노력하다, 감사하다",
    title: "상호 작용 전문가",
    group: "특정 비즈니스 그룹 - 특정 플랫폼 부서 - 특정 기술 부서 - UED",
    tags: {
      create: [
        {
          key: "0",
          label: "매우 사려 깊은",
        },
        {
          key: "1",
          label: "디자인에 집중",
        },
        {
          key: "2",
          label: "맵다~",
        },
        {
          key: "3",
          label: "긴 다리",
        },
        {
          key: "4",
          label: "추안메이즈",
        },
        {
          key: "5",
          label: "모든 강 포함",
        },
      ],
    },
    notifyCount: 12,
    unreadCount: 11,
    country: "China",
    address: "Xiamen City 77",
    phone: "0592-268888888",
  },
};

export { AccountSeed };
