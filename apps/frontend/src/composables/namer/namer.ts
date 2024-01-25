import { useApolloQuery } from '@/composables/use.apollo.query';
import { NAME_SUGGESTIONS_QUERY } from '@/graphql/operations/namer.operation';
import type { UiNamerFormArgs } from '@/ui/namer.ui';
import type { NameSuggestionsQuery, QueryNameSuggestionsArgs } from '@support/shared/types';
import { ref } from 'vue';

const useNamer = () => {
  const namerFormArgs = ref<UiNamerFormArgs>({
    lang: '',
    type: '',
    crud: '',
    input: '',
  });

  const nameSuggestionsArgs = ref<string>();

  const nameSuggestions = async (namerFormArgs: UiNamerFormArgs) => {
    const { apolloQuery } = useApolloQuery<NameSuggestionsQuery, QueryNameSuggestionsArgs>(NAME_SUGGESTIONS_QUERY, {
      input: namerFormArgs,
    });

    const result = await apolloQuery();
    nameSuggestionsArgs.value = result.data.nameSuggestions;
  };

  return {
    namerFormArgs,
    nameSuggestions,
    nameSuggestionsArgs,
  };
};

export { useNamer };
