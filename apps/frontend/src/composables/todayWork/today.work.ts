import { GET_USERS_QUERY } from '@/graphql/operations/main.operation';
import { CREATE_TODAY_WORK_ITEM_MUTATION } from '@/graphql/operations/today.work.operation';
import { type UiTodayWorkInputArgs, type UiTodayWorkListArgs } from '@/ui/today.work.ui';
import {
  type CreateTodayWorkItemInput,
  type CreateTodayWorkItemMutation,
  type CreateTodayWorkItemMutationVariables,
  type GetUsersQuery,
} from '@support/shared/types';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';

const useTodayWork = () => {
  const todayWorkInputArgs = ref<UiTodayWorkInputArgs>({
    title: '',
    desc: '',
  });

  const todayWorkListArgs = ref<UiTodayWorkListArgs>({
    item: [],
  });

  const createTodayWorkItem = (input: CreateTodayWorkItemInput) => {
    const { mutate } = useMutation<CreateTodayWorkItemMutation, CreateTodayWorkItemMutationVariables>(
      CREATE_TODAY_WORK_ITEM_MUTATION,
      {
        variables: {
          input,
        },
      },
    );

    mutate();
  };

  const works = () => {
    const { result } = useQuery<GetUsersQuery>(GET_USERS_QUERY);

    return result;
  };

  return { todayWorkInputArgs, todayWorkListArgs, createTodayWorkItem, works };
};

export { useTodayWork };
