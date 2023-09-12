/**
 * 팔라고 WAS를 위한 공통 HTTP Request 모듈
 * @author jtmoon
 * @copyright 한국선불카드(주)
 * @see None
 */

import { RESULT_CODE, type Api, type Result } from '@/api/api';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

//타입 정의
export type OnSuccess = (response: AxiosResponse) => void;
export type OnFailed = (isSysErr: boolean, error: any, reqUrl: string) => void;
export interface UserOptions {
  immediate?: boolean; //즉시 실행 여부
  loading?: boolean; //로딩 출력 여부
  onSuccess?: OnSuccess; //성공시 호출되는 콜백
  onFailed?: OnFailed; //실패시 호출되는 콜백
  onErrorDelegator?: OnFailed; //시용자가 외부에서 팔라고 WAS 에러를 핸들링 하고 싶은 경우 등록
}

const CONNECTION_TIMEOUT = import.meta.env.VITE_HTTP_REQUEST_TIMEOUT; //5초

//디폴트 axios request config
const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  method: 'get',
  headers: {},
  timeout: CONNECTION_TIMEOUT,
};

//사용자 옵션
const defaultOptions: UserOptions = {
  immediate: true,
  loading: false,
};

/**
 * config 정보 추가
 * @param config axios 환경 설정
 * @returns AxiosRequestConfig
 */
const makeAxiosConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { method, headers } = config;
  const hasContentType = method?.toLocaleLowerCase() == 'post' || method?.toLocaleLowerCase() == 'put';

  if (headers != null) {
    headers.Accept = 'application/json';
    if (hasContentType) {
      //외부에서 contents type을 넣어 주었다면 외부것을 사용하고 내부에서는 초기값을 사용한다.
      headers['Content-Type'] = headers['Content-Type'] ?? 'application/json';
    }
  }
  return config;
};

/**
 * HTTP  Request
 * @param url //호출되는 api URL
 * @param config //axios request config
 * @param options //사용자 옵션(즉시실행, 성공/실패 콜백)
 * @returns http response, 수신된 데이터, 에러여부, 로딩여부, request 실행 함수
 */
export const useHttpRequest = <TX, RX>(url: string, config: AxiosRequestConfig = {}, options: UserOptions = {}) => {
  const response = ref<AxiosResponse>();
  const data = ref<RX | null>();
  const error = ref(null);
  const isProcessing = ref(false);
  const { onSuccess, onFailed, immediate, onErrorDelegator, loading } = {
    ...defaultOptions,
    ...options,
  };

  console.log('[axios] start ---> ', url);

  const { params } = config;
  /**
   * 저정된 HTTP Request 실행함수
   * @param body 서버로 전송될 데이터(json object)
   */
  const execute = (body?: unknown) => {
    data.value = null;
    error.value = null;
    isProcessing.value = true;

    //request config 설정
    const requestConfig: AxiosRequestConfig<TX> = {
      ...makeAxiosConfig({
        ...defaultConfig,
        ...config,
      }),
      params: unref(params),
    };

    //실행시 body data를 넣어 준다면 교체
    if (typeof body === 'object') {
      requestConfig.data = { ...body } as TX;
    }

    console.log('[AXIOS]request config ---> ', requestConfig);

    axios<TX, AxiosResponse<RX>, TX>(unref(url), requestConfig)
      .then((res) => {
        console.log(`[AXIOS]response <--  ${requestConfig.url} response =`, res);
        response.value = res;
        data.value = res.data;
        const rxData = res.data as Result;
        if (rxData?.code !== RESULT_CODE.ok) {
          //사용자가 에러 핸들러 등록한 경우 에러 처리를 위임
          if (onErrorDelegator != null) onErrorDelegator?.(false, res.data, unref(url));
          else {
            alert(rxData.message);
            onFailed?.(false, res.data, unref(url));
          }
        } else onSuccess?.(res);
      })
      .catch((err) => {
        console.log('[AXIOS]error :', error);
        error.value = err;

        onFailed?.(true, err, unref(url));
      })
      .finally(() => {
        isProcessing.value = false;
      });
  };

  if (isRef(params) || isRef(url)) {
    watchEffect(execute);
  } else {
    if (immediate) {
      execute();
    }
  }

  return {
    response, //서버에서 응답 받은 객체
    data, //서버에서 응답 받은 데이터(json object)
    error, //에러 객체
    isProcessing, //처리중 여부
    execute, //실행 합수
  };
};

/**
 * Api 객체를 받아서 http request 전송
 * @param api 호출되는 api URL
 * @param options 사용자 옵션(즉시실행, 성공/실패 콜백)
 * @returns http response, 수신된 데이터, 에러여부, 로딩여부, request 실행 함수
 */
export const useHttpRequestWithApi = <TX, RX>(api: Api, options: UserOptions = {}) =>
  useHttpRequest<TX, RX>(api.url, api.config, options);

/**
 * Api 객체를 받아서 http request 전송(프라미스 버전)
 * @param api 호출되는 api URL
 * @param loading 로딩 출력 여부
 * @param hookError 에러 외부처리 여부
 * @returns Promise
 */
export const useHttpRequestWithApiPromise = <TX, RX>(api: Api, loading = false, hookError = false) =>
  new Promise<RX>((resolve, reject) => {
    useHttpRequest<TX, RX>(api.url, api.config, {
      immediate: true,
      loading,
      onSuccess: (response: AxiosResponse) => resolve(response.data),
      onFailed: (_, error: any, reqUrl: string) => reject(error),
      onErrorDelegator: hookError ? (_, error: any, reqUrl: string) => reject(error) : undefined,
    });
  });
