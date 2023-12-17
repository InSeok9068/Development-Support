import { urlDashBoard, type UrlDashBoard } from '@/router/url/dashboard.url';
import { urlIndex, type UrlIndex } from '@/router/url/index.url';
import { urlTechSpec, type UrlTechSpec } from '@/router/url/tech.spec.url ';
import { urlTodayWork, type UrlTodayWork } from '@/router/url/today.work.url';
import type { App } from 'vue';
import type { Router } from 'vue-router';

type VueRouter = Router | undefined;

//플러그인 종류
export const PLUGIN_NAVIGATOR_NAME = 'navi';

export interface IPlgNavi {
  index: (router?: VueRouter) => UrlIndex;
  dashboard: (router?: VueRouter) => UrlDashBoard;
  todayWork: (router?: VueRouter) => UrlTodayWork;
  login: (router?: VueRouter) => UrlLogin;
  techSpec: (router?: VueRouter) => UrlTechSpec;
}

export default {
  install(app: App) {
    const navi: IPlgNavi = {
      index: urlIndex,
      dashboard: urlDashBoard,
      todayWork: urlTodayWork,
      techSpec: urlTechSpec,
    };
    app.config.globalProperties.$navi = navi;
    app.provide(PLUGIN_NAVIGATOR_NAME, app.config.globalProperties.$navi);
  },
};
