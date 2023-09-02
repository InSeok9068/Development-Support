/**
 * api
 */
import { MainApiBuilder, type IMainApiBuilder } from './mainApi';

/**
 * 종류별로 분리된 API를 하나의 객체에서 접근 가능하도록 인터페이스를 제공함
 */

export interface IApi {
  mainBuilder: () => IMainApiBuilder;
}

export const Api: IApi = {
  mainBuilder: MainApiBuilder,
};
