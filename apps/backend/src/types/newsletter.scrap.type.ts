import { Page } from 'puppeteer';

export interface Newslettercraping {
  readonly page: Page;
  readonly newsletterScrap: NewsletterScrap;
  getHomeUrl(): string;
  scrapTitle(): Promise<void>;
  scrapSourceUniqueKey(): Promise<void>;
  scrapSourceLink(): Promise<void>;
  scrapOriginLink(): Promise<void>;
  nextPage(): Promise<void>;
  saveNewsletterScrap(): Promise<void>;
}

export interface NewsletterScrap {
  title: string;
  source: string;
  sourceUniqueKey?: string;
  sourceLink?: string;
  originLink?: string;
}
