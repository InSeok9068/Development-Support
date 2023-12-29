import { useToast } from '@/composables/toast';
import {
  CREATE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_ITEM_MUTATION,
  SEND_WEEKLY_REPORT_MUTATION,
  SUGGESTIONS_QUERY,
  UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER,
  WORKS_QUERY,
} from '@/graphql/operations/today.work.operation';
import {
  type UiTodayWorkInputArgs,
  type UiTodayWorkItemArgs,
  type UiTodayWorkListArgs,
  type UiTodayWorkSearchArgs,
  type UiTodayWorkSuggestions,
} from '@/ui/today.work.ui';
import {
  type CreateTodayWorkItemInput,
  type CreateTodayWorkItemMutationVariables,
  type MutationDeleteTodayWorkItemArgs,
  type QueryWorksArgs,
  type SuggestionsQuery,
  type SuggestionsQueryVariables,
  type UpdateTodayWorkItemForTransferInput,
  type UpdateTodayWorkItemForTransferMutationVariables,
  type Work,
  type WorkItem,
  type WorksQuery,
} from '@support/shared/types';
import { CreateTodayWorkItemInputValidator } from '@support/shared/validators';
import { useMutation, useQuery } from '@vue/apollo-composable';
import dayjs from 'dayjs';
import { ref } from 'vue';
const { toast } = useToast();

const useTodayWork = () => {
  const todayWorkInputArgs = ref<UiTodayWorkInputArgs>({
    title: '',
    content: '',
    time: 1,
  });

  const todayWorkListArgs = ref<UiTodayWorkListArgs>({
    item: [],
  });

  const todayWorkSearchArgs = ref<UiTodayWorkSearchArgs>({
    date: dayjs().format('YYYY-MM-DD'),
  });

  const suggestionsArgs = ref<UiTodayWorkSuggestions>({
    suggestion: [],
  });

  const works = (searchArgs: UiTodayWorkSearchArgs) => {
    const { onResult, onError } = useQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      input: {
        date: searchArgs.date,
      },
    });

    onResult((result) => {
      todayWorkListArgs.value = {
        item: result.data?.works?.map((work) => {
          return {
            id: Number(work?.id),
            title: work?.title,
            time: work?.time,
            subItem: work?.workItems?.map((item) => {
              return {
                itemId: Number(item?.itemId),
                content: item?.content,
                time: item?.time,
              };
            }),
          };
        }) as UiTodayWorkItemArgs[],
      };
    });

    onError((error) => {
      toast.value = {
        ...toast.value,
        detail: error.message,
      };
    });
  };

  const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
    input.time = Number(input.time);

    if (!CreateTodayWorkItemInputValidator.safeParse(input).success) {
      toast.value = {
        ...toast.value,
        detail: '요청 데이터 확인',
      };
      return;
    }

    const { mutate } = useMutation<Work, CreateTodayWorkItemMutationVariables>(CREATE_TODAY_WORK_ITEM_MUTATION, {
      variables: {
        input,
      },
      refetchQueries: [WORKS_QUERY, 'Works'],
    });

    await mutate().catch((error) => {
      toast.value = {
        ...toast.value,
        detail: error.message,
      };
    });
  };

  const updateTodayWorkItemForTransfer = async (input: UpdateTodayWorkItemForTransferInput) => {
    const { mutate } = useMutation<Work, UpdateTodayWorkItemForTransferMutationVariables>(
      UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER,
      {
        variables: {
          input,
        },
        refetchQueries: [WORKS_QUERY, 'Works'],
      },
    );

    await mutate().catch((error) => {
      toast.value = {
        ...toast.value,
        detail: error.message,
      };
    });
  };

  const deleteTodayWorkItem = async (itemId: number) => {
    const { mutate } = useMutation<WorkItem, MutationDeleteTodayWorkItemArgs>(DELETE_TODAY_WORK_ITEM_MUTATION, {
      variables: {
        itemId: String(itemId),
      },
      refetchQueries: [WORKS_QUERY, 'Works'],
    });

    await mutate().catch((error) => {
      toast.value = {
        detail: error.message,
        life: 300,
      };
    });
  };

  const sendWeeklyReport = async () => {
    const { mutate } = useMutation<boolean>(SEND_WEEKLY_REPORT_MUTATION);

    await mutate().catch((error) => {
      toast.value = {
        ...toast.value,
        detail: error.message,
      };
    });
  };

  const suggestions = async (title: string) => {
    const { onResult, onError } = useQuery<SuggestionsQuery, SuggestionsQueryVariables>(SUGGESTIONS_QUERY, {
      input: {
        title,
      },
    });

    onResult((result) => {
      suggestionsArgs.value = {
        suggestion: result.data?.suggestions?.map((suggestion) => suggestion?.title) as string[],
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
    todayWorkInputArgs,
    todayWorkListArgs,
    todayWorkSearchArgs,
    suggestionsArgs,
    createTodayWorkItem,
    deleteTodayWorkItem,
    updateTodayWorkItemForTransfer,
    sendWeeklyReport,
    suggestions,
    works,
  };
};

export { useTodayWork };
