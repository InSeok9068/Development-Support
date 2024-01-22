export interface UiNewslettersSearchArgs {
  source?: string;
}

export interface UiNewsletterItemArgs {
  id: string;
  title: string;
  source?: string;
  sourceLink?: string;
  originLink?: string;
}

export interface UiNewsletterListArgs {
  item: UiNewsletterItemArgs[];
}
