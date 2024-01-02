import { useToast } from '@/composables/toast';
import { WORKS_QUERY } from '@/graphql/operations/today.work.operation';
import type { UiWorkListArgs } from '@/ui/work.list.ui';
import type { QueryWorksArgs, WorksQuery } from '@support/shared/types';
import { useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';
const { toast } = useToast();

const useWorkList = () => {
  const workListArgs = ref<UiWorkListArgs>({
    item: [],
  });

  const works = () => {
    const { onResult, onError } = useQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      input: {
        startDate: '2023-12-01',
        endDate: '2023-12-31',
      },
    });

    onResult((result) => {
      // workListArgs.value = {
      //   item: result.data?.works?.map((work) => {}),
      // };
    });

    onError((error) => {
      toast.value = {
        ...toast.value,
        detail: error.message,
      };
    });
  };
};
