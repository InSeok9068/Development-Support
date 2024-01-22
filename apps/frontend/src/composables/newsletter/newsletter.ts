import { useToast } from '@/composables/toast';
import { NEWSLETTERS_QUERY } from '@/graphql/operations/newsletter.operation';
import type { UiNewsletterItemArgs, UiNewsletterListArgs, UiNewslettersSearchArgs } from '@/ui/newsletter.ui';
import type { NewslettersQuery, QueryNewslettersArgs } from '@support/shared/types';
import { useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';
const { toast } = useToast();

const useNewsletter = () => {
  const newslettersSearchArgs = ref<UiNewslettersSearchArgs>({
    source: '',
  });

  const newsletterListArgs = ref<UiNewsletterListArgs>({
    item: [] as UiNewsletterItemArgs[],
  });

  const newsletters = (searchArgs: UiNewslettersSearchArgs) => {
    const { onResult, onError } = useQuery<NewslettersQuery, QueryNewslettersArgs>(NEWSLETTERS_QUERY, {
      input: searchArgs,
    });

    onResult((result) => {
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
    });

    onError((error) => {
      toast.value = {
        ...toast.value,
        detail: error.message,
      };
    });
  };

  return {
    newslettersSearchArgs,
    newsletterListArgs,
    newsletters,
  };
};

export { useNewsletter };
