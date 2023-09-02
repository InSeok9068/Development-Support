import { urlDashBoard, type UrlDashBoard } from '@/router/url/urlDashboard';
import { urlMain, type UrlMain } from '@/router/url/urlMain';
import type { App } from 'vue';
import type { Router } from 'vue-router';

type VueRouter = Router | undefined;

//플러그인 종류
export const PLUGIN_NAVIGATOR_NAME = 'navi';

export interface IPlgNavi {
  main: (router?: VueRouter) => UrlMain;
  dashboard: (router?: VueRouter) => UrlDashBoard;
}

export default {
  install(app: App) {
    const navi: IPlgNavi = {
      main: urlMain,
      dashboard: urlDashBoard,
    };
    app.config.globalProperties.$navi = navi;
    app.provide(PLUGIN_NAVIGATOR_NAME, app.config.globalProperties.$navi);
  },
};
