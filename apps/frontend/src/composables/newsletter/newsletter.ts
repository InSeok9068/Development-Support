import { useApolloMutation } from '@/composables/use.apollo.mutation';
import { useApolloQuery } from '@/composables/use.apollo.query';
import { NEWSLETTERS_QUERY, NOW_SCRAPING_NEWSLETTERS_MUTATION } from '@/graphql/operations/newsletter.operation';
import type { UiNewsletterItemArgs } from '@/ui/newsletter.ui';
import type { Newsletter, NewslettersInput, NewslettersQuery, QueryNewslettersArgs } from '@support/shared/types';
import { ref } from 'vue';

const useNewsletter = () => {
  const newslettersSearchArgs = ref<NewslettersInput>({});

  const newsletterListArgs = ref<UiNewsletterItemArgs[]>([]);

  const newsletters = async (searchArgs: NewslettersInput) => {
    const { apolloQuery } = useApolloQuery<NewslettersQuery, QueryNewslettersArgs>(NEWSLETTERS_QUERY, {
      input: searchArgs,
    });

    const result = await apolloQuery();

    newsletterListArgs.value = result.data.newsletters.map(
      (newsletter) =>
        ({
          id: newsletter?.id,
          title: newsletter?.title,
          source: newsletter?.source,
          sourceLink: newsletter?.sourceLink,
          originLink: newsletter?.originLink,
        }) as UiNewsletterItemArgs,
    );
  };

  const nowScrapingNewsletters = async () => {
    const { apolloMutation } = useApolloMutation<Newsletter>(NOW_SCRAPING_NEWSLETTERS_MUTATION);
    await apolloMutation();
    await newsletters(newslettersSearchArgs.value);
  };

  return {
    newslettersSearchArgs,
    newsletterListArgs,
    newsletters,
    nowScrapingNewsletters,
  };
};

export { useNewsletter };
