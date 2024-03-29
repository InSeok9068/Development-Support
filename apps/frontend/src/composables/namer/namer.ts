import { useApolloQuery } from '@/composables/use.apollo.query';
import { useValidator } from '@/composables/validator';
import { NAME_SUGGESTIONS_QUERY } from '@/graphql/operations/namer.operation';
import type { NameSuggestionsInput, NameSuggestionsQuery, QueryNameSuggestionsArgs } from '@support/shared/types';
import { NameSuggestionsInputSchema } from '@support/shared/validators';
import { ref } from 'vue';
const useNamer = () => {
  const { safeParseIfErrorToast } = useValidator();

  const namerFormArgs = ref<NameSuggestionsInput>({
    lang: '',
    type: '',
    crud: '',
    input: '',
  });

  const nameSuggestionsArgs = ref<string>();

  const nameSuggestions = async (namerFormArgs: NameSuggestionsInput) => {
    if (!safeParseIfErrorToast(NameSuggestionsInputSchema().safeParse(namerFormArgs))) {
      return;
    }

    nameSuggestionsArgs.value = '';

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
