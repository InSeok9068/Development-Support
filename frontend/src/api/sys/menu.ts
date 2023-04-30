import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';
import { getAppEnvConfig } from '@/utils/env';

enum Api {
  GetMenuList = '/menus',
}

const { VITE_GLOB_BACKEND_API_URL } = getAppEnvConfig();
const apiUrl = VITE_GLOB_BACKEND_API_URL;

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList }, { apiUrl });
};
