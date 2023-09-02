import type { LocationQueryRaw, Router } from 'vue-router';
import { NAVI_GO, type GoResult, URL_DIR, type UrlRoute } from '@/router/url/urlCommon';

//--------------------------------------------------------------------------------------------
// 각 URL별 타입들
//--------------------------------------------------------------------------------------------
type DashboardRoute = UrlRoute;

//--------------------------------------------------------------------------------------------
// URL 빌더
//--------------------------------------------------------------------------------------------
export const DASHBOARD_URL = '/dashboard';

/**
 * URL Routes의 타입
 */
export interface UrlDashBoard {
  dashboard: () => DashboardRoute;
}

/**
 * 최초 진입
 * @param router 라우터 핸들
 * @returns UrlDashBoard
 */
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
    } /* End of dashboard */,
  };
}; /* End of UrlDashBoard */
