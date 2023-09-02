import type { GoResult } from '@/router/url/urlCommon';

export interface UiCardArgs {
  title: string;
  desc?: string;
  move: () => GoResult;
}
