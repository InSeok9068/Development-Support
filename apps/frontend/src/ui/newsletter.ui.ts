import { Source } from '@support/shared/types';

export interface UiNewslettersSearchArgs {
  source?: Source;
}

export interface UiNewsletterItemArgs {
  id: string;
  title: string;
  source?: Source;
  sourceLink?: string;
  originLink?: string;
}

export interface UiNewsletterListArgs {
  item: UiNewsletterItemArgs[];
}
