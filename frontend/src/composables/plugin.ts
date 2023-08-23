import { PLUGIN_NAVIGATOR_NAME, type IPlgNavi } from '@/plugins/navigatorPlugin';
import { PLUGIN_STRING_NAME } from '@/plugins/stringPlugin';
import type { IStringUtil } from '@/utils/stringUtil';

import { inject } from 'vue';

/**
 * provide로 등록된 플러그인을 스크립트 태그내에서 쉽게 접근하기 위한 syntax sugar
 * @returns 플러그인의 핸들
 */
export const usePlugin = (): {
  [x: string]: any;
  $navi: IPlgNavi;
  $str: IStringUtil;
} => {
  return {
    $navi: inject(PLUGIN_NAVIGATOR_NAME) as IPlgNavi,
    $str: inject(PLUGIN_STRING_NAME) as IStringUtil,
  };
};
