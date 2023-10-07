import { urlDashBoard, type UrlDashBoard } from '@/router/url/dashboard.url';
import { urlMain, type UrlMain } from '@/router/url/main.url';
import { urlTodayWork, type UrlTodayWork } from '@/router/url/today.work.url';
import type { App } from 'vue';
import type { Router } from 'vue-router';

type VueRouter = Router | undefined;

//플러그인 종류
export const PLUGIN_NAVIGATOR_NAME = 'navi';

export interface IPlgNavi {
  main: (router?: VueRouter) => UrlMain;
  dashboard: (router?: VueRouter) => UrlDashBoard;
  todayWork: (router?: VueRouter) => UrlTodayWork;
}

export default {
  install(app: App) {
    const navi: IPlgNavi = {
      main: urlMain,
      dashboard: urlDashBoard,
      todayWork: urlTodayWork,
    };
    app.config.globalProperties.$navi = navi;
    app.provide(PLUGIN_NAVIGATOR_NAME, app.config.globalProperties.$navi);
  },
};
