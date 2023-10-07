/**
 * WAS API Base
 * @author jtmoon
 * @copyright 한국선불카드(주)
 * @see None
 */

import type { AxiosRequestConfig } from 'axios';
/**
 * HTTP 코드 재정의
 */
export const HTTP_CODE = {
  OK: 200,
  PAGE_NOT_FOUND: 404,
} as const;
export type HTTP_CODE = (typeof HTTP_CODE)[keyof typeof HTTP_CODE];

/**
 * HTTP Request method
 */
export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;
export type HTTP_METHOD = (typeof HTTP_METHOD)[keyof typeof HTTP_METHOD];

/**
 * 응답 코드 정의
 */
export const RESULT_CODE = {
  ok: 0,
  isSuccess: (code: number) => code == RESULT_CODE.ok,
  isFailed: (code: number) => code != RESULT_CODE.ok,
} as const;
export type RESULT_CODE = (typeof RESULT_CODE)[keyof typeof RESULT_CODE];

export interface Result<D = any> {
  code: RESULT_CODE;
  message: string;
  data?: D | null;
}

//-------------------------------------------------------------------------------------------
// API의 공통 타입
//-------------------------------------------------------------------------------------------
export const PAGING = {
  DEFAULT_COUNT: 10,
} as const;

//-------------------------------------------------------------------------------------------
// 베이스 API
//-------------------------------------------------------------------------------------------
// 키/값 파라미터
export type keyValue = { [key: string]: string | number | boolean | null } | null | undefined;

// 쿼리와 헤더 파라미터 배열
export type Parameter = {
  querys?: keyValue;
  headers?: keyValue;
  body?: unknown;
} | null;

// api 생성 정보
export interface Api {
  url: string;
  config: AxiosRequestConfig;
}

/**
 * 값이 null인 field를 객체에서 제거
 * @param values json 객체
 * @returns 값이 null인 필드가 제거된 객체
 */
export const removeEmptyValue = (values: keyValue): keyValue => {
  if (values == null) return null;
  return Object.keys(values).reduce((acc, cur) => {
    if (acc != null && values[cur] != null) {
      acc[cur] = values[cur];
    }
    return acc;
  }, {} as keyValue);
};

/**
 * API 정보 생성
 * @param directory API의 디렉토리
 * @param apiName API 이름
 * @param method HTTP Request method(get, post, put, delete)
 * @param parameter Axios config의 추가적인 header및 params들
 * @returns api 정보를 담은 객체
 */
export const API = (directory: string, apiName: string, method: string, parameter: Parameter | null = null): Api => {
  const url = `${directory}/${apiName}`;
  const config: AxiosRequestConfig = { method };

  //헤더와 쿼리 파라미터에 null 필드라 존재하면 제거
  if (parameter?.headers != null || parameter?.querys != null) {
    const { headers, querys } = parameter;
    //header와 query의 값이 null인 필드는 제거
    config.headers = { ...removeEmptyValue(headers) };
    config.params = { ...removeEmptyValue(querys) };
    //if (headers != null) config.headers = headers;
    //if (querys != null) config.params = querys;
    console.log(`[Api][${url}] config -->`, config);
  }

  //Body에 들어가는 Json 데이터가 존재한다면 삽입
  if (parameter?.body != null) {
    config.data = parameter?.body;
  }

  return {
    url,
    config,
  };
};
