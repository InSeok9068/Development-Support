import type { RouteRecordRaw } from 'vue-router';
import { urlDashBoard } from './url/dashboard.url';
import { urlIndex } from './url/index.url';
import { urlLogin } from './url/login.url';
import { urlNamer } from './url/namer.url';
import { urlNewsletter } from './url/newsletter.url';
import { urlTechSpec } from './url/tech.spec.url ';
import { urlTodayWork } from './url/today.work.url';
import { urlWorkList } from './url/work.list.url';

/**
 * Route 합성
 * @param routes route 배열
 * @returns Readonly<RouteRecordRaw[]>
 */
const makeRoutes = (...routes: any) => {
  if (import.meta.env.DEV) {
    console.log(`*******************************************************`);
    console.log(`* Palago All route`);
    console.log(`*******************************************************`);
  }
  return routes.reduce(
    (acc: any, route: any) => [
      ...acc,
      ...Object.keys(route).map((key: string) => {
        const obj = route[key]();
        if (import.meta.env.DEV) {
          console.log(`${obj.desc} : ${obj.path}`);
        }
        return { path: obj.path, component: obj.component };
      }),
    ],
    [],
  );
};

export const routes: Readonly<RouteRecordRaw[]> = [
  ...makeRoutes(
    urlIndex(),
    urlLogin(),
    urlDashBoard(),
    urlTodayWork(),
    urlWorkList(),
    urlTechSpec(),
    urlNewsletter(),
    urlNamer(),
    // MUST BE: 기능별 URL route를 반들면 아래에 반드시 등록해야 url이 동작합니다.
  ),
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: plgUrlError().common().component,
  //   beforeEnter: (to, from, next) => next(plgUrlError().common({ ecode: 'e0003' }).go() as RouteLocationRaw),
  // },
];
