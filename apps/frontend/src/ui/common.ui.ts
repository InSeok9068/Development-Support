import type { GoResult } from '@/router/url/common.url';

export interface UiCardArgs {
  title: string;
  desc?: string;
  move: () => GoResult;
}
