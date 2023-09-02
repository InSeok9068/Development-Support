import type { LocationQueryRaw, Router } from 'vue-router';
import { NAVI_GO, type GoResult, URL_DIR, type UrlRoute } from '@/router/url/urlCommon';

//--------------------------------------------------------------------------------------------
// 각 URL별 타입들
//--------------------------------------------------------------------------------------------
type MainRoute = UrlRoute;

//--------------------------------------------------------------------------------------------
// URL 빌더
//--------------------------------------------------------------------------------------------
export const MAIN_URL = '/main';

/**
 * URL Routes의 타입
 */
export interface UrlMain {
  main: () => MainRoute;
}

/**
 * 최초 진입
 * @param router 라우터 핸들
 * @returns UrlMain
 */
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
    } /* End of main */,
  };
}; /* End of UrlMain */
