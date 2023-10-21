import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type TechSpecRoute = UrlRoute;

export const TECH_SPEC_URL = '/tech-spec';

export interface UrlTechSpec {
  techSpec: () => TechSpecRoute;
}

export const urlTechSpec = (router?: Router): UrlTechSpec => {
  return {
    techSpec: function (): TechSpecRoute {
      return {
        path: TECH_SPEC_URL,
        component: () => import('@/views/techSpec/TechSpecView.vue'),
        desc: '기술 스펙',
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
