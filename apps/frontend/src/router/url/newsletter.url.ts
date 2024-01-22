import { NAVI_GO, URL_DIR, type GoResult, type UrlRoute } from '@/router/url/common.url';
import type { Router } from 'vue-router';

type NewsletterRoute = UrlRoute;

export const NEWSLETTER_URL = '/newsletter';

export interface UrlNewsletter {
  newsletter: () => NewsletterRoute;
}

export const urlNewsletter = (router?: Router): UrlNewsletter => {
  return {
    newsletter: function (): NewsletterRoute {
      return {
        path: NEWSLETTER_URL,
        component: () => import('@/views/newsletter/NewsletterView.vue'),
        desc: '뉴스레터',
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
