import { useApolloMutation } from '@/composables/use.apollo.mutation';
import { useApolloQuery } from '@/composables/use.apollo.query';
import { NEWSLETTERS_QUERY, NOW_SCRAPING_NEWSLETTERS_MUTATION } from '@/graphql/operations/newsletter.operation';
import type { Newsletter, NewslettersInput, NewslettersQuery, QueryNewslettersArgs } from '@support/shared/types';
import { ref } from 'vue';

const useNewsletter = () => {
  const newslettersSearchArgs = ref<NewslettersInput>({});

  const newsletterListArgs = ref<NewslettersQuery>();

  const newsletters = async (searchArgs: NewslettersInput) => {
    const { apolloQuery } = useApolloQuery<NewslettersQuery, QueryNewslettersArgs>(NEWSLETTERS_QUERY, {
      input: searchArgs,
    });

    newsletterListArgs.value = (await apolloQuery()).data;
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
