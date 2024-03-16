import { Source } from '@support/shared/types';
export interface UiNewsletterItemArgs {
  id: string;
  title: string;
  source: Source;
  sourceLink?: string;
  originLink?: string;
}
