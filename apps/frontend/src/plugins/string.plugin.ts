/**
 * 문자열 관련 유틸
 */
import { stringUtil } from '@support/shared/utils';
import type { App } from 'vue';

//플러그인 종류
export const PLUGIN_STRING_NAME = 'str';

export default {
  install(app: App) {
    app.config.globalProperties.$str = stringUtil;
    app.provide(PLUGIN_STRING_NAME, app.config.globalProperties.$str);
  },
};
