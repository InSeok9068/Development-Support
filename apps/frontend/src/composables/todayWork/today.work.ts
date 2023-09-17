import {
  CREATE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_ITEM_MUTATION,
  WORKS_QUERY,
} from '@/graphql/operations/today.work.operation';
import { useToastStore } from '@/stores/toast';
import { type UiTodayWorkInputArgs, type UiTodayWorkItemArgs, type UiTodayWorkListArgs } from '@/ui/today.work.ui';
import {
  type CreateTodayWorkItemInput,
  type CreateTodayWorkItemMutationVariables,
  type MutationDeleteTodayWorkItemArgs,
  type Work,
  type WorkItem,
  type WorksQuery,
} from '@support/shared/types';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';
const { showToast } = useToastStore();

const useTodayWork = () => {
  const todayWorkInputArgs = ref<UiTodayWorkInputArgs>({
    title: '',
    content: '',
  });

  const todayWorkListArgs = ref<UiTodayWorkListArgs>({
    item: [],
  });

  const works = () => {
    const { onResult, onError } = useQuery<WorksQuery>(WORKS_QUERY);

    onResult((result) => {
      todayWorkListArgs.value = {
        item: result.data?.works?.map((work) => {
          return {
            id: Number(work?.id),
            title: work?.title,
            subItem: work?.workItems?.map((item) => {
              return {
                id: Number(item?.id),
                content: item?.content,
              };
            }),
          };
        }) as UiTodayWorkItemArgs[],
      };
    });

    onError((error) => {
      showToast('에러', error.message);
    });
  };

  const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
    const { mutate } = useMutation<Work[], CreateTodayWorkItemMutationVariables>(CREATE_TODAY_WORK_ITEM_MUTATION, {
      variables: {
        input,
      },
      refetchQueries: [WORKS_QUERY, 'Works'],
    });

    await mutate().catch((error) => showToast('에러', error.message));
  };

  const deleteTodayWorkItem = async (id: number) => {
    const { mutate } = useMutation<WorkItem, MutationDeleteTodayWorkItemArgs>(DELETE_TODAY_WORK_ITEM_MUTATION, {
      variables: {
        id: String(id),
      },
      refetchQueries: [WORKS_QUERY, 'Works'],
    });

    await mutate().catch((error) => showToast('에러', error.message));
  };

  return { todayWorkInputArgs, todayWorkListArgs, createTodayWorkItem, deleteTodayWorkItem, works };
};

export { useTodayWork };
