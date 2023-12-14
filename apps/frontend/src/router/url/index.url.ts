import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type IndexRoute = UrlRoute;

export const INDEX_URL = '/';

export interface UrlIndex {
  index: () => IndexRoute;
}

export const urlIndex = (router?: Router): UrlIndex => {
  return {
    index: function (): IndexRoute {
      return {
        path: INDEX_URL,
        component: () => import('@/layouts/AppLayout.vue'),
        desc: '인덱스',
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
