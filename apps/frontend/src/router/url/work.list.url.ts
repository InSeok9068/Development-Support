import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type WorkListRoute = UrlRoute;

export const WORK_LIST_URL = '/work-list';

export interface UrlWorkList {
  workList: () => WorkListRoute;
}

export const urlWorkList = (router?: Router): UrlWorkList => {
  return {
    workList: function (): WorkListRoute {
      return {
        path: WORK_LIST_URL,
        component: () => import('@/views/workList/WorkListView.vue'),
        desc: '한일 목록',
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
