/**
 * custom 속성들의 글로벌 선언
 */
import type { IStringUtil } from '@support/shared/utils/string.util';
import type { ITimeUtil } from '@support/shared/utils/time.util';
import type { IPlgNavi } from './plugins/navigator.plugin';

export {};
declare module 'vue' {
  interface ComponentCustomProperties {
    $navi: IPlgNavi;
    $str: IStringUtil;
    $time: ITimeUtil;
  }
}
