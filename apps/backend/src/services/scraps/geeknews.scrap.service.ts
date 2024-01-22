import { createNewsletter } from '@/services/newsletter.service';
import { NewsletterScrap, Newslettercraping } from '@/types/newsletter.scrap.type';
import { Page } from 'puppeteer';

class GeekNewsScrap implements Newslettercraping {
  readonly page: Page;
  readonly newsletterScrap: NewsletterScrap;

  constructor(source: string, page: Page) {
    this.page = page;
    this.newsletterScrap = {} as NewsletterScrap;
    this.newsletterScrap.source = source;
  }

  getHomeUrl(): string {
    return 'https://news.hada.io';
  }

  async scrapTitle(): Promise<void> {}

  async scrapSourceUniqueKey(): Promise<void> {}

  async scrapSourceLink(): Promise<void> {}

  async scrapOriginLink(): Promise<void> {}

  async nextPage(): Promise<void> {}

  async saveNewsletterScrap(): Promise<void> {
    await createNewsletter(this.newsletterScrap);
  }
}

export { GeekNewsScrap };
