#!/usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';

console.log(figlet.textSync('Development Support CLI'));

inquirer.registerPrompt('autocomplete', inquirerPrompt);

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
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: '무엇을 도와드릴까요?',
          choices: [
            {
              name: '파일 생성',
              value: 'CREATE_FILE',
            },
          ],
        },
        {
          type: 'input',
          name: 'fileName',
          message: '파일 이름을 입력하세요.',
          validate: (input) => {
            if (input.length === 0) {
              return '파일 이름을 입력하세요.';
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        const fileName = answers.fileName;
        inquirer
          .prompt([
            {
              type: 'checkbox',
              name: 'option',
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
            },
          ])
          .then((answers) => {
            const filterFileActions = fileActions.filter((fileAction) => answers.option.includes(fileAction.option));
            filterFileActions.forEach((a) => console.log(a.action(fileName)));

            inquirer
              .prompt([
                {
                  name: 'ok',
                  message: '해당 경로로 파일을 생성하시겠습니까?',
                  type: 'confirm',
                },
              ])
              .then((answers) => {
                if (answers.ok) {
                  filterFileActions.forEach((fileAction) => {
                    fs.ensureFile(fileAction.action(fileName));
                  });
                  console.log('파일 생성이 완료되었습니다.');
                }
              });
          });
      });
  });

program.parse(process.argv);
