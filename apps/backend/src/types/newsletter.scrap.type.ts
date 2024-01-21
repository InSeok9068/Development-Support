export interface Newslettercraping {
  getHomeUrl(): string;
  getSource(): string;
  scrapTitle(): Promise<void>;
  scrapSourceUniqueKey(): Promise<void>;
  scrapSourceLink(): Promise<void>;
  scrapOriginLink(): Promise<void>;
}

export interface NewsletterScrap {
  title: string;
  source: string;
  sourceUniqueKey?: string;
  sourceLink?: string;
  originLink?: string;
}
