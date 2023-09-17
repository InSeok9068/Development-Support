import {
  CREATE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_ITEM_MUTATION,
  WORKS_QUERY,
} from '@/graphql/operations/today.work.operation';
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

const useTodayWork = () => {
  const todayWorkInputArgs = ref<UiTodayWorkInputArgs>({
    title: '',
    content: '',
  });

  const todayWorkListArgs = ref<UiTodayWorkListArgs>({
    item: [],
  });

  const works = () => {
    // const { onResult } = useQuery<WorksQuery>(WORKS_QUERY, {
    //   fetchPolicy: 'no-cache',
    // });
    const { onResult } = useQuery<WorksQuery>(WORKS_QUERY);

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
  };

  const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
    const { mutate } = useMutation<Work[], CreateTodayWorkItemMutationVariables>(CREATE_TODAY_WORK_ITEM_MUTATION, {
      variables: {
        input,
      },
    });

    await mutate();

    works();
  };

  const deleteTodayWorkItem = async (id: number) => {
    const { mutate } = useMutation<WorkItem, MutationDeleteTodayWorkItemArgs>(DELETE_TODAY_WORK_ITEM_MUTATION, {
      variables: {
        id: String(id),
      },
    });

    await mutate();

    works();
  };

  return { todayWorkInputArgs, todayWorkListArgs, createTodayWorkItem, deleteTodayWorkItem, works };
};

export { useTodayWork };
