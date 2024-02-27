#!/usr/bin/env node

import { checkbox, confirm, input, select } from '@inquirer/prompts';
import { program } from 'commander';
import figlet from 'figlet';
import fs from 'fs-extra';

console.log(figlet.textSync('Development Support CLI'));

const fileActions = [
  {
    path: './apps/backend/src/graphql/types',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.type.graphql`;
    },
  },
  {
    path: './apps/backend/src/graphql/resolvers',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.resolver.ts`;
    },
  },
  {
    path: './apps/backend/src/services',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.services.ts`;
    },
  },
  {
    path: './apps/frontend/src/graphql/operations',
    option: 1,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.operation.graphql`;
    },
  },
  {
    path: './apps/frontend/src/views',
    option: 2,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}/${fileName}View.vue`;
    },
  },
  {
    path: './apps/frontend/src/ui',
    option: 2,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.ui.ts`;
    },
  },
  {
    path: './apps/frontend/src/composables',
    option: 2,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}/${fileName.toLowerCase()}.ts`;
    },
  },
  {
    path: './apps/frontend/src/router/url',
    option: 3,
    action: function (fileName) {
      return `${this.path}/${fileName.toLowerCase()}.url.ts`;
    },
  },
];

program
  .version('1.0.0')
  .description('개발 도우미 CLI')
  .action(async () => {
    const action = await select({
      message: '무엇을 도와드릴까요?',
      choices: [
        {
          name: '파일 생성',
          value: 'CREATE_FILE',
        },
      ],
    });

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
    filterFileActions.forEach((a) => console.log(a.action(fileName)));

    const ok = await confirm({
      message: '해당 경로로 파일을 생성하시겠습니까?',
    });

    if (ok) {
      filterFileActions.forEach((fileAction) => {
        fs.ensureFile(fileAction.action(fileName));
      });
      console.log('파일 생성이 완료되었습니다.');
    }
  });

program.parse(process.argv);
