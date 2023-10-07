/**
 * 시간 관련 유틸
 */
import { timeUtil } from '@support/shared/utils';
import type { App } from 'vue';

//플러그인 종류
export const PLUGIN_TIME_NAME = 'time';

export default {
  install(app: App) {
    app.config.globalProperties.$time = timeUtil;
    app.provide(PLUGIN_TIME_NAME, app.config.globalProperties.$time);
  },
};
