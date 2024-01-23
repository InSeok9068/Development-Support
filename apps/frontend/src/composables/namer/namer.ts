import { useToast } from '@/composables/toast';
import { NAME_SUGGESTIONS_QUERY } from '@/graphql/operations/namer.operation';
import type { UiNamerFormArgs } from '@/ui/namer.ui';
import type { QueryNameSuggestionsArgs } from '@support/shared/types';
import { useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';
const { toast } = useToast();

const useNamer = () => {
  const namerFormArgs = ref<UiNamerFormArgs>({
    lang: '',
    type: '',
    crud: '',
    input: '',
  });

  const nameSuggestionsArgs = ref<string>();

  const nameSuggestions = async (namerFormArgs: UiNamerFormArgs) => {
    const { onResult, onError } = useQuery<string, QueryNameSuggestionsArgs>(NAME_SUGGESTIONS_QUERY, {
      input: namerFormArgs,
    });

    onResult((result) => {
      nameSuggestionsArgs.value = result.data;
    });

    onError((error) => {
      toast.value = {
        ...toast.value,
        detail: error.message,
      };
    });
  };

  return {
    namerFormArgs,
    nameSuggestions,
    nameSuggestionsArgs,
  };
};

export { useNamer };
