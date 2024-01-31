import { useApolloMutation } from '@/composables/use.apollo.mutation';
import { useApolloQuery } from '@/composables/use.apollo.query';
import { NEWSLETTERS_QUERY, NOW_SCRAPING_NEWSLETTERS_MUTATION } from '@/graphql/operations/newsletter.operation';
import type { UiNewsletterItemArgs, UiNewsletterListArgs, UiNewslettersSearchArgs } from '@/ui/newsletter.ui';
import type { Newsletter, NewslettersQuery, QueryNewslettersArgs } from '@support/shared/types';
import { ref } from 'vue';

const useNewsletter = () => {
  const newslettersSearchArgs = ref<UiNewslettersSearchArgs>({});

  const newsletterListArgs = ref<UiNewsletterListArgs>({
    item: [] as UiNewsletterItemArgs[],
  });

  const newsletters = async (searchArgs: UiNewslettersSearchArgs) => {
    const { apolloQuery } = useApolloQuery<NewslettersQuery, QueryNewslettersArgs>(NEWSLETTERS_QUERY, {
      input: searchArgs,
    });

    const result = await apolloQuery();

    newsletterListArgs.value = {
      item: result.data?.newsletters?.map((newsletter) => {
        return {
          id: newsletter?.id,
          title: newsletter?.title,
          source: newsletter?.source,
          sourceLink: newsletter?.sourceLink,
          originLink: newsletter?.originLink,
        };
      }) as UiNewsletterItemArgs[],
    };
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
