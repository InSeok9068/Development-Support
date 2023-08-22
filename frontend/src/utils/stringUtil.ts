import { escape, unescape } from 'lodash';

/**
 * Rest parameter을 받아서 comma로 분리된 스트링으로 변환
 * @param args string 또는 숫자의 rest parameter
 * @returns csv 형식의 스트링
 */
export const toCsvString = (...args: any[]): string => args.join(',');

/**
 * 소대문자 구분없이 스트링을 비교한다.
 * @param src
 * @param target
 * @returns true/false
 */
export const stringCompareNoCase = (src: string | null, target: string | null): boolean => {
  if (src == null || target == null) return src === target;
  return src.toLowerCase() === target.toLowerCase();
};

/**
 * 빈 스트링 여부를 검사한다.
 * @param text 검사 대상
 * @param isTrim trim 적용여부
 * @returns 빈스트링 여부
 */
export const isEmptyString = (text: string | null | undefined, isTrim?: boolean) => {
  if (text == null) return true;
  let trim = text;
  if (isTrim) trim = text.trim();
  return trim.length <= 0;
};

export const isZeroOrNull = (text: number | null) => {
  if (text == null) return true;
  if (text == 0) return true;
  return false;
};

/**
 * 이메일 유효성 검사
 */
export const isValidEmailFormat = (email: string) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const matched = email.match(validRegex);
  return matched != null && matched.length > 0;
};

/**
 * 천 콤마 스트링
 */
export const toCommaString = (value: string | number | null): string => {
  try {
    if (value == null) {
      return '';
    }
    const target = typeof value == 'number' ? `${value}` : value;
    return target.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (e) {
    return '';
  }
};

/**
 * UTF-8 to Base64
 */
export const utf8ToBase64 = (utf8: string) => {
  return window.btoa(unescape(encodeURIComponent(utf8)));
};

/**
 * Base64 to UTF-8
 */
export const base64ToUtf8 = (base64: string) => {
  return decodeURIComponent(escape(window.atob(base64)));
};

/**
 * 앞에 0으로 채우기
 */
export const fillPaddingChar = (str: string | number, length: number, padding?: string) => {
  return String(str).padStart(length, padding ?? '0');
};

/**
 * 랜덤 ID 생성
 */
const generateRandomId = (prefix: string) => {
  const milliseconds = new Date().getMilliseconds();
  const seconds = new Date().getSeconds();
  return `${prefix}_${seconds}_${milliseconds}`;
};

/**
 * 캐리지 리턴을 BR로 변경
 */
const carriageReturnToBrTag = (text: string) => {
  try {
    return text.replace(/\r/g, '').replace(/\n/g, '<br>');
  } catch (e) {
    return text;
  }
};

/**
 * input에서 이벤트를 받아서 숫자가 아니며 클리어 시켜버림
 */
const correctToNumberForInputEvent = (e: any) => {
  const regex = /[^0-9]/g;
  if (regex.test(e.target.value)) {
    e.target.value = e.target.value.replace(regex, '');
    return null;
  }
  const temp = e.target.value;
  const numeric = parseInt(temp);
  if (numeric == null || isNaN(numeric)) {
    e.target.value = '';
    return null;
  }
  return numeric;
};

/**
 * input에서 숫자 콤마 찍는 함수
 */

const inputNumberFormat = (event: Event) => {
  try {
    (event.target as HTMLInputElement).value =
      (event.target as HTMLInputElement).value[0].replace('0', '') +
      (event.target as HTMLInputElement).value.substring(1);
  } catch (e) {
    (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value;
  }

  (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value
    .replace(/[^0-9,]/g, '')
    .replace(/(\..*)\./g, '$1');
  const str = (event.target as HTMLInputElement).value;
  const showValue = comma(unComma(str));
  const realValue = parseInt(showValue.replace(/,/g, ''));
  return { showValue, realValue };
};

const comma = (str: string) => {
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

const unComma = (str: string) => {
  return str.replace(/[^\d]+/g, '');
};

/**
 * 스트링 유틸리티 인터페이스
 */
export interface IStringUtil {
  toCsvString: (...args: any[]) => string;
  stringCompareNoCase: (src: string | null, target: string | null) => boolean;
  isEmptyString: (text: string | null | undefined, isTrim?: boolean) => boolean;
  isValidEmailFormat: (email: string) => boolean;
  toCommaString: (value: string | number | null) => string;
  utf8ToBase64: (utf8: string) => string;
  base64ToUtf8: (base64: string) => string;
  fillPaddingChar: (str: string | number, length: number, padding?: string) => string;
  generateRandomId: (prefix: string) => string;
  carriageReturnToBrTag: (text: string) => string;
  correctToNumberForInputEvent: (e: any) => any | null;
  isZeroOrNull: (text: number | null) => boolean;
  inputNumberFormat: (e: Event) => any;
}

/**
 * 스트링 유틸리티들
 */
export const stringUtil: IStringUtil = {
  toCsvString,
  stringCompareNoCase,
  isEmptyString,
  isValidEmailFormat,
  toCommaString,
  utf8ToBase64,
  base64ToUtf8,
  fillPaddingChar,
  generateRandomId,
  carriageReturnToBrTag,
  correctToNumberForInputEvent,
  isZeroOrNull,
  inputNumberFormat,
};
