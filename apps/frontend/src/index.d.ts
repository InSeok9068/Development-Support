/**
 * custom 속성들의 글로벌 선언
 */
import type { IStringUtil } from './utils/string.util';

export {};
declare module 'vue' {
  interface ComponentCustomProperties {
    $str: IStringUtil;
    $navi: IPlgNavi;
  }
}
