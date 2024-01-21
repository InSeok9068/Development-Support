export interface UiNewslettersSearchArgs {
  source?: string;
}

export interface UiNewsletterItemArgs {
  title: string;
  source?: string;
  sourceLink?: string;
  originLink?: string;
}

export interface UiNewsletterListArgs {
  item: UiNewsletterItemArgs[];
}
