import { isEmptyString } from '@support/shared/utils/string.util';
import type { LocationQueryRaw, NavigationFailure, RouteLocationRaw, Router } from 'vue-router';

/**
 * 페이지 이동후 결과
 */
export type RouterResult = Promise<void | NavigationFailure | undefined>;
export type GoResult = RouteLocationRaw | RouterResult;

//공통 Route 헤더
export interface UrlRoute {
  path: string;
  component: any;
  desc: string;
  dir: () => string;
  go: (isReplace?: boolean) => GoResult;
  fullPath?: () => string;
}

/**
 * 주어진 파라미터로 페이지를 이동시키거나 라우터 로케이션 파라미터를 반환한다
 * @param args 라우터 로케이션 파라미터
 * @param router 라우터 핸들
 * @param isReplace 이동시 페이지 교체여부(true면 history가 남지 않음)
 * @returns RouteLocationRaw(라우트 파라미터) or RouterResult(라우팅 결과)
 */
export const NAVI_GO = (args: RouteLocationRaw, router?: Router, isReplace?: boolean): GoResult => {
  return router != null ? router?.[isReplace == true ? 'replace' : 'push'](args) : args;
};

/**
 * vue-router의 URL 파라미터를 값으로 대체하는 함수
 * @param path url의 directory
 * @param parentDir 보모 디렉토리(Default : "")
 * @param params 사용자에게 입력받은 url parameter(Default : null)
 * @returns 값으로 대체된 url
 */
export const URL_DIR = (path: string, parentDir = '', params: any = null): string => {
  if (typeof params === 'object') {
    for (const key in params) path = path.replace(`:${key}`, params[key]);
  }
  return (isEmptyString(parentDir, true) ? path : `${parentDir}/${path}`).replace('//', '/');
};

/**
 * 객체에서 유효한 값만을 뽑아서 쿼리 스트링 생성
 * @param obj query 객체
 * @returns N/A
 */
export const QUERY_STRING = (obj: any): LocationQueryRaw => {
  const query: LocationQueryRaw = {};
  for (const property in obj) query[property] = obj[property];
  return query;
};
