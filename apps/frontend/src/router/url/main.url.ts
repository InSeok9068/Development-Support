import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type MainRoute = UrlRoute;

export const MAIN_URL = '/main';

export interface UrlMain {
  main: () => MainRoute;
}

export const urlMain = (router?: Router): UrlMain => {
  return {
    main: function (): MainRoute {
      return {
        path: MAIN_URL,
        component: () => import('@/views/main/MainView.vue'),
        desc: '메인화면',
        dir: function () {
          return URL_DIR(this.path);
        },
        go: function (isReplace?: boolean): GoResult {
          return NAVI_GO({ path: this.dir() }, router, isReplace);
        },
      };
    },
  };
};
