/**
 * custom 속성들의 글로벌 선언
 */
import type { IStringUtil } from './utils/stringUtil';
import type { IStringUtil } from './utils/';

export {};
declare module 'vue' {
  interface ComponentCustomProperties {
    $str: IStringUtil;
    $navi: IPlgNavi;
  }
}
