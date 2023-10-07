/**
 * 시간 관련 유틸리티
 * @author jtmoon
 * @copyright 한국선불카드(주)
 * @see None
 */

import dayjs, { type ManipulateType } from 'dayjs';
import 'dayjs/locale/ko';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';

//플러그인 추가
dayjs.locale('ko');
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(duration);
dayjs.extend(isBetween);

export type TIME_FORMAT =
  | 'YYYYMMDD'
  | 'YYYY-MM-DD'
  | 'YYYY.MM.DD'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY.MM.DD HH:mm'
  | 'YYYYMMDDHHmmss'
  | 'M월 D일'
  | 'HH:mm'
  | 'HHmm'
  | 'YY.MM.DD'
  | 'A HH:mm'
  | 'A hh:mm';

//테스트를 위한 임시함수
const startTest = () => {
  console.log('---------> TIME UTILITY TEST <-------- ');
  console.log('current', dayjs());
  console.log('expired1', isExpiredAt('20230330171540'));
  console.log('expired2', isExpiredBefore('20230330172030', 60));
  console.log('remain', remainUntil('20230330173959'));
  console.log('remainUntilBefore', remainUntilBefore('20230330175000', 1));
  /*
	timeoutDt({
		dateTime: '20230331104100',
		tag: 'mytimer',
		beforeAfterSeconds: 0,
		startedCb: timer => {
			console.log('[Timer]started!', timer, '  ', dayjs());
		},
	})
		.then(obj => {
			console.log('[Timer]Timeout:', obj);
		})
		.catch(reason => {
			console.log('[Timer]Error', reason);
		});
*/
  const myTimer = async () => {
    try {
      const timeout = await timeoutDt({
        dateTime: '20230331104700',
        tag: 'mytimer',
        beforeAfterSeconds: 0,
        startedCb: (timer) => {
          console.log('[Timer]started!', timer, '  ', dayjs());
        },
      });
      console.log('[Timer]Timeout==>await', timeout);
    } catch (e) {
      console.log(e);
    }
  };
  myTimer();

  console.log('[Time][Format]', toTimeString({ dateTime: '20230331104700' }));
  // console.log('[Time][Format]', toTimeString({ dateTime: '20230331104700', outFormat: 'YYYY/MM/DD' }));
  // console.log('[Time][Format]', toTimeString({ dateTime: '20230331104700', outFormat: 'YYYY/MM/DD HH:mm:ss' }));
  // console.log('[Time][Format]', toTimeString({ dateTime: '20230331104700', outFormat: 'YYYY-MM-DD HH:mm:ss' }));
  // console.log('[Time][Format]', toTimeString({ dateTime: '20230331104700', outFormat: 'YYYY-MM-DD HH:mm:ss.SSS' }));

  console.log('[Time][Range]', betweenTime('20230331104700', '20230331104700', '20230331104759'));
  console.log('[Time][Range]', betweenTime('20230331104600', '20230331104700', '20230331104759'));
  console.log('[Time][Range]', betweenTime('20230331104702', '20230331104700', '20230331104759'));
  console.log('[Time][Range]', betweenTime('20230331104800', '20230331104700', '20230331104759'));
  return 0;
};

/**
 * 주어진 시간의 경과 여부 체크
 * @param expireTime 경과시간(미래시간)
 * @returns 경과여부
 */
export const isExpiredAt = (expireTime: string): boolean => dayjs(expireTime).isSameOrBefore(dayjs());

/**
 * 주어진 시간에서 몇초전에 사전경과 여부 확인
 * @param targetTime 대상 시간
 * @param beforeSec 몇초전
 * @returns 경과 여부
 */
export const isExpiredBefore = (targetTime: string, beforeSec: number): boolean => {
  const expireTime = dayjs(targetTime).subtract(beforeSec, 'second');
  return isExpiredAt(expireTime.format());
};

/**
 * 주어진 시간에서 몇초전에 사전경과 여부 확인
 * @param targetTime 대상 시간
 * @param beforeMinute 몇 분전
 * @returns 경과 여부
 */
export const isExpiredBeforeMinutes = (targetTime: string, beforeMinute: number): boolean => {
  const expireTime = dayjs(targetTime).subtract(beforeMinute, 'minute');
  return isExpiredAt(expireTime.format());
};

/**
 * 주어진 시간에서 몇초전에 사전경과 여부 확인
 * @param targetTime 대상 시간
 * @param beforeHours 몇 시간전
 * @returns 경과 여부
 */
export const isExpiredBeforeHours = (targetTime: string, beforeHours: number): boolean => {
  const expireTime = dayjs(targetTime).subtract(beforeHours, 'hour');
  return isExpiredAt(expireTime.format());
};

/**
 * 대상시간까지 남은 시간
 * @param targetTime 대상시간
 * @returns 남은초
 */
export const remainUntil = (targetTime: string) => {
  return dayjs(targetTime).diff(dayjs(), 'seconds');
};

/**
 * 주어진 분을 뺀 대상시간까지 남은 시간
 * @param targetTime 대상시간
 * @param beforeMinute 몇 분전
 * @returns 남은초
 */
export const remainUntilBefore = (targetTime: string, beforeMinute: number) => {
  const time = dayjs(targetTime).subtract(beforeMinute, 'minute');
  return remainUntil(time.format());
};

export interface TimeoutMsArg {
  ms: number;
  tag?: any;
  beforeAfterMs?: number;
  startedCb?: (timer: NodeJS.Timeout) => void;
}

/**
 * 타임아웃
 * @param ms : 타임아웃 시간(밀리초)
 * @param tag : 타이머의 구분을 위한 태그
 * @param beforeAfterMs : 타임아웃 시간보다 몇 밀리초 전 또는 몇 밀리초 후 만료
 * @param startedCb : 타이머 시작 알림 콜백
 * @returns Promise<unknown>
 */
export const timeoutMs = ({
  ms,
  tag,
  beforeAfterMs,
  startedCb,
}: TimeoutMsArg): Promise<{ tag: any; timer: NodeJS.Timeout }> => {
  if (beforeAfterMs != null && beforeAfterMs != 0) {
    ms = beforeAfterMs > 0 ? ms + beforeAfterMs : ms - Math.abs(beforeAfterMs);
  }
  return new Promise((resolve, reject) => {
    if (ms <= 0) {
      reject('Already time over!');
      return;
    }
    const timer = setTimeout(() => {
      resolve({ tag: tag != null ? tag : null, timer });
    }, ms);
    startedCb?.(timer);
  });
};

export interface TimeoutDtArg {
  dateTime: string;
  tag?: any;
  beforeAfterSeconds?: number;
  startedCb?: (timer: NodeJS.Timeout) => void;
}

/**
 * 타임아웃
 * @param dateTime : 타임아웃시간(datetime: 19701212070900)
 * @param tag : 타이머의 구분을 위한 태그
 * @param beforeAfterSecond : 타임아웃 시간보다 몇초전 또는 몇초후 만료
 * @param startedCb : 타이머 시작 알림 콜백
 * @returns Promise<unknown>
 */
export const timeoutDt = ({ dateTime, tag, beforeAfterSeconds, startedCb }: TimeoutDtArg): Promise<unknown> => {
  return timeoutMs({
    ms: dayjs(dateTime).diff(dayjs(), 'milliseconds'),
    tag,
    beforeAfterMs: beforeAfterSeconds != null ? beforeAfterSeconds * 1000 : 0,
    startedCb,
  });
};

export interface ToTimeStringArg {
  dateTime: string | null;
  inFormat?: TIME_FORMAT;
  outFormat?: TIME_FORMAT;
}

/**
 * 주어진 형식으로 시간을 포멧팅한다.
 * @param dateTime 포맷팅할 시간
 * @param inFormat 포맷팅할 시간의 형식
 * @param outFormat 포맷팅된 시간의 형식
 * @returns 포멧팅된 string
 */
export const toTimeString = ({ dateTime, inFormat = 'YYYYMMDDHHmmss', outFormat = 'YYYY.MM.DD' }: ToTimeStringArg) => {
  if (dateTime == null) return '';
  return dayjs(dateTime, inFormat).format(outFormat);
};

/**
 * 시간 컨버팅
 * @param targetTime 대상시간
 * @returns 오후/오전 HH:mm
 */
export const toTimeConvert = ({ dateTime, inFormat }: { dateTime: string; inFormat: TIME_FORMAT }) => {
  const time = dayjs(dateTime, inFormat);
  let text = '';
  let hour = time.get('hour');
  const minute = `${time.get('minutes')}`.padStart(2, '0');
  if (hour > 12) {
    hour = hour - 1;
    text = '오후';
  } else {
    text = '오전';
  }
  return `${text} ${hour}:${minute}`;
};

/**
 * 현재 날짜 출력
 * @param format 시간 포맷
 * @returns format으로 포맷팅된 현재 날짜
 */
export const today = (format: TIME_FORMAT) => {
  return toTimeString({ dateTime: new Date().toDateString(), outFormat: format });
};

/**
 * 시간 더하기
 * @param time 계산 전 시간
 * @param plusTime 더할 시간
 * @param timeUnit 더할 시간의 타임 유닛
 * @param format 시간 포맷
 * @returns 시간 포맷 string
 */
export const plusTime = (time: string, offset: number, timeUnit: ManipulateType, format: TIME_FORMAT) => {
  const resultDate = dayjs(time).add(offset, timeUnit);
  return resultDate.format(format);
};

/**
 * 시간 빼기
 * @param time 계산 전 시간
 * @param plusTime 뺄 시간
 * @param timeUnit 뺄 시간의 타임 유닛
 * @param format 시간 포맷
 * @returns 시간 포맷 string
 */
export const minusTime = (time: string, offset: number, timeUnit: ManipulateType, format: TIME_FORMAT) => {
  const resultDate = dayjs(time).subtract(offset, timeUnit);
  return resultDate.format(format);
};

/**
 * 주어진 시간이 범위안에 존재하는지를 점검
 * @param dateTime 범위안에 시간이 있는지를 체크할 시간(20230331104700)
 * @param from 범위 시작 시간(20230331104700, 20230331)
 * @param to 범위 종료 시간(20230331104700, 20230331)
 * @returns 범위안에 존재여부(boolean)
 */
export const betweenTime = (dateTime: string, from: string, to: string) => {
  return dayjs(dateTime).isBetween(from, to);
};

/**
 * 시간 유틸리티 인터페이스
 */
export interface ITimeUtil {
  startTest: () => void;
  isExpiredAt: (expireTime: string) => boolean;
  isExpiredBefore: (targetTime: string, beforeSec: number) => boolean;
  isExpiredBeforeMinutes: (targetTime: string, beforeMinute: number) => boolean;
  isExpiredBeforeHours: (targetTime: string, beforeHours: number) => boolean;
  remainUntil: (targetTime: string) => number;
  remainUntilBefore: (targetTime: string, beforeMinute: number) => number;
  timeoutMs: ({ ms, tag, beforeAfterMs, startedCb }: TimeoutMsArg) => Promise<unknown>;
  timeoutDt: ({ dateTime, tag, beforeAfterSeconds, startedCb }: TimeoutDtArg) => Promise<unknown>;
  toTimeString: ({ dateTime, inFormat, outFormat }: ToTimeStringArg) => string;
  betweenTime: (dateTime: string, from: string, to: string) => boolean;
  today: (format: TIME_FORMAT) => string;
  plusTime: (time: string, plusTime: number, timeUnit: ManipulateType, format: TIME_FORMAT) => string;
  minusTime: (time: string, offset: number, timeUnit: ManipulateType, format: TIME_FORMAT) => string;
  toTimeConvert: ({ dateTime, inFormat }: { dateTime: string; inFormat: TIME_FORMAT }) => string;
}

/**
 * 시간 유틸리티들
 */
export const timeUtil: ITimeUtil = {
  startTest,
  isExpiredAt,
  isExpiredBefore,
  isExpiredBeforeMinutes,
  isExpiredBeforeHours,
  remainUntil,
  remainUntilBefore,
  timeoutMs,
  timeoutDt,
  toTimeString,
  betweenTime,
  today,
  plusTime,
  minusTime,
  toTimeConvert,
};
