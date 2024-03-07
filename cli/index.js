#!/usr/bin/env node

import { select } from '@inquirer/prompts';
import { program } from 'commander';
import figlet from 'figlet';
import { fileAction } from './actions/file.action.js';
import { packageReleaseAction } from './actions/package.release.action.js';

console.log(figlet.textSync('Development Support CLI'));

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
        {
          name: '패키지 최신 릴리즈 날짜 확인',
          value: 'PACKAGE_RELEASE',
        },
      ],
    });

    switch (action) {
      case 'CREATE_FILE':
        fileAction();
        break;
      case 'PACKAGE_RELEASE':
        packageReleaseAction();
        break;
    }
  });

program.parse(process.argv);
