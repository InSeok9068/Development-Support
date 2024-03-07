import { checkbox, confirm, input } from '@inquirer/prompts';
import boxen from 'boxen';
import Table from 'cli-table3';
import fs from 'fs-extra';

const fileActions = [
  {
    name: '(Backend) GrahpQL 스키마',
    path: './apps/backend/src/graphql/types',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.type.graphql`;
    },
  },
  {
    name: '(Backend) GrahpQL 리졸버',
    path: './apps/backend/src/graphql/resolvers',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.resolver.ts`;
    },
  },
  {
    name: '(Backend) 서비스',
    path: './apps/backend/src/services',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.service.ts`;
    },
  },
  {
    name: '(Fronted) GraphQL 오퍼레이션',
    path: './apps/frontend/src/graphql/operations',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.operation.graphql`;
    },
  },
  {
    name: '(Fronted) View 화면',
    path: './apps/frontend/src/views',
    option: 2,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}/${fileName}View.vue`;
    },
  },
  {
    name: '(Fronted) View 유형',
    path: './apps/frontend/src/ui',
    option: 2,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.ui.ts`;
    },
  },
  {
    name: '(Fronted) View 로직',
    path: './apps/frontend/src/composables',
    option: 2,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}/${fileName.toLowerCase()}.ts`;
    },
  },
  {
    name: '(Fronted) URL 라우터',
    path: './apps/frontend/src/router/url',
    option: 3,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.url.ts`;
    },
  },
];

const fileAction = async () => {
  const fileName = await input({
    message: '파일 이름을 입력하세요.',
    validate: (value) => value.length !== 0,
  });

  const option = await checkbox({
    message: '생성 옵션을 선택해주세요.(다중 선택 가능)',
    choices: [
      {
        name: 'Backend + Fronted (API 공급)',
        value: 1,
        checked: true,
      },
      {
        name: 'Fronted (화면)',
        value: 2,
      },
      {
        name: 'Fronted (라우터)',
        value: 3,
      },
    ],
  });

  const filterFileActions = fileActions.filter((fileAction) => option.includes(fileAction.option));
  const table = new Table();
  filterFileActions.forEach((a) => table.push([a.name, a.action(fileName)]));
  console.log(table.toString());

  const ok = await confirm({
    message: '해당 경로로 파일을 생성하시겠습니까?',
  });

  if (ok) {
    filterFileActions.forEach((fileAction) => {
      fs.ensureFile(fileAction.action(fileName));
    });
    console.log(boxen('파일 생성이 완료되었습니다.', { padding: 1 }));
  }
};

export { fileAction };
