import { ResultEnum } from '../enums/http.enum';

enum ResultTypeEnum {
  SUCCESS = 'success',
  ERROR = 'error',
}

export class Result<T> {
  readonly code: ResultEnum;
  readonly message: string;
  readonly type: string;
  readonly result?: T;

  private constructor(code: ResultEnum, message: string, type: ResultTypeEnum, result: T) {
    this.code = code;
    this.message = message;
    this.type = type;
    this.result = result;
  }

  static success<T>(result?: T) {
    return new Result<T>(ResultEnum.SUCCESS, 'ok', ResultTypeEnum.SUCCESS, result);
  }

  static error(message = 'Request failed') {
    return new Result<null>(ResultEnum.ERROR, message, ResultTypeEnum.ERROR, null);
  }

  static timeout(message = 'Request timeout') {
    return new Result<null>(ResultEnum.TIMEOUT, message, ResultTypeEnum.ERROR, null);
  }

  isSuccess() {
    return this.type === ResultEnum.SUCCESS.toString();
  }

  isError() {
    return this.type === ResultEnum.ERROR.toString();
  }
}
