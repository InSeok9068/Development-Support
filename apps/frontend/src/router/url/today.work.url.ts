import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type TodayWorkRoute = UrlRoute;

export const TODAY_WORK_URL = '/today-work';

export interface UrlTodayWork {
  todayWork: () => TodayWorkRoute;
}

export const urlTodayWork = (router?: Router): UrlTodayWork => {
  return {
    todayWork: function (): TodayWorkRoute {
      return {
        path: TODAY_WORK_URL,
        component: () => import('@/views/todayWork/TodayWorkView.vue'),
        desc: '오늘 한일',
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
