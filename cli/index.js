#!/usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-autocomplete-prompt';

console.log(figlet.textSync('Development Support CLI'));

inquirer.registerPrompt('autocomplete', inquirerPrompt);

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
            {
              name: '파일 삭제',
              value: 'DELETE_FILE',
            },
          ],
        },
      ])
      .then((answers) => {
        const action = answers.action;
        inquirer
          .prompt([
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
            console.log(`선택한 작업: ${action}`);
            console.log(`입력한 파일 이름: ${fileName}`);
          });
      });
  });

program.parse(process.argv);
