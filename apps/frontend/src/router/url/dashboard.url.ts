import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type DashboardRoute = UrlRoute;

export const DASHBOARD_URL = '/dashboard';

export interface UrlDashBoard {
  dashboard: () => DashboardRoute;
}

export const urlDashBoard = (router?: Router): UrlDashBoard => {
  return {
    dashboard: function (): DashboardRoute {
      return {
        path: DASHBOARD_URL,
        component: () => import('@/views/dashboard/DashboardView.vue'),
        desc: '대시보드',
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
