import { urlDashBoard, type UrlDashBoard } from '@/router/url/dashboard.url';
import { urlIndex, type UrlIndex } from '@/router/url/index.url';
import { urlLogin, type UrlLogin } from '@/router/url/login.url';
import { urlNamer, type UrlNamer } from '@/router/url/namer.url';
import { urlNewsletter, type UrlNewsletter } from '@/router/url/newsletter.url';
import { urlTechSpec, type UrlTechSpec } from '@/router/url/tech.spec.url ';
import { urlTodayWork, type UrlTodayWork } from '@/router/url/today.work.url';
import { urlWorkList, type UrlWorkList } from '@/router/url/work.list.url';
import type { App } from 'vue';
import type { Router } from 'vue-router';

type VueRouter = Router | undefined;

//플러그인 종류
export const PLUGIN_NAVIGATOR_NAME = 'navi';

export interface IPlgNavi {
  index: (router?: VueRouter) => UrlIndex;
  login: (router?: VueRouter) => UrlLogin;
  dashboard: (router?: VueRouter) => UrlDashBoard;
  todayWork: (router?: VueRouter) => UrlTodayWork;
  techSpec: (router?: VueRouter) => UrlTechSpec;
  workList: (router?: VueRouter) => UrlWorkList;
  newsletter: (router?: VueRouter) => UrlNewsletter;
  namer: (router?: VueRouter) => UrlNamer;
}

export default {
  install(app: App) {
    const navi: IPlgNavi = {
      index: urlIndex,
      login: urlLogin,
      dashboard: urlDashBoard,
      todayWork: urlTodayWork,
      techSpec: urlTechSpec,
      workList: urlWorkList,
      newsletter: urlNewsletter,
      namer: urlNamer,
    };
    app.config.globalProperties.$navi = navi;
    app.provide(PLUGIN_NAVIGATOR_NAME, app.config.globalProperties.$navi);
  },
};
