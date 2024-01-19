export interface Newslettercraping {
  getHomeUrl(): string;
  scrapTitle(): Promise<void>;
  scrapSource(): Promise<void>;
  scrapSourceLink(): Promise<void>;
  scrapOriginLink(): Promise<void>;
}

export interface NewsletterScrap {
  title: string;
  source: string;
  sourceLink: string;
  originLink: string;
}
