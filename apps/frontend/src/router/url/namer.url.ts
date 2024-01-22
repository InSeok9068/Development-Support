import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type NamerRoute = UrlRoute;

export const NAMER_URL = '/namer';

export interface UrlNamer {
  namer: () => NamerRoute;
}

export const urlNamer = (router?: Router): UrlNamer => {
  return {
    namer: function (): NamerRoute {
      return {
        path: NAMER_URL,
        component: () => import('@/views/namer/NamerView.vue'),
        desc: '이름 짓기',
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
