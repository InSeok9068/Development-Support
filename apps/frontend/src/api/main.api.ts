import { API, HTTP_METHOD, type Api, type Parameter, type Result } from './api';

//-------------------------------------------------------------------------------------------
// TYPE
//-------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------
// Request/Response Model
//-------------------------------------------------------------------------------------------
/**
 * 유저 조회
 */
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export type UserResponse = Result<User>;

//-------------------------------------------------------------------------------------------
// API LIST
//-------------------------------------------------------------------------------------------

/**
 * 메인 API 빌더 인터페이스
 */
export interface IMainApiBuilder {
  getUser: (id: number) => Api;
}

/**
 * 유틸리티
 */
const MAIN_DIR = '/users';

const MAIN_API = (method: string, apiName: string, parameter: Parameter = null) =>
  API(MAIN_DIR, apiName, method, parameter);

/**
 * 메인 API 빌더
 * @returns 메인 API 객체
 */
export const MainApiBuilder = (): IMainApiBuilder => {
  return {
    /**
     * 유저 조회 API
     * @param N/A
     * @returns Api
     */
    getUser: () => MAIN_API(HTTP_METHOD.GET, ''),
  };
};
