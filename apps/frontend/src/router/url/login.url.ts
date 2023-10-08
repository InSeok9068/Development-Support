import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type LoginRoute = UrlRoute;

export const LOGIN_URL = '/login';

export interface UrlLogin {
  login: () => LoginRoute;
}

export const urlLogin = (router?: Router): UrlLogin => {
  return {
    login: function (): LoginRoute {
      return {
        path: LOGIN_URL,
        component: () => import('@/views/login/LoginView.vue'),
        desc: '로그인',
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
