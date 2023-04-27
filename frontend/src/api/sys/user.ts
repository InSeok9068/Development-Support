import { defHttp } from '/@/utils/http/axios';
import { GetUserInfoModel, LoginParams, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { getAppEnvConfig } from '@/utils/env';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/users/',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

const { VITE_GLOB_BACKEND_API_URL } = getAppEnvConfig();
const apiUrl = VITE_GLOB_BACKEND_API_URL;

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(userId: string) {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo, params: { userId } },
    { errorMessageMode: 'none', apiUrl },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
