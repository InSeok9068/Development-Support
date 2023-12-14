import { useToast } from '@/composables/toast';
import {
  CREATE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_ITEM_MUTATION,
  SEND_WEEKLY_REPORT_MUTATION,
  UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER,
  WORKS_QUERY,
} from '@/graphql/operations/today.work.operation';
import {
  type UiTodayWorkInputArgs,
  type UiTodayWorkItemArgs,
  type UiTodayWorkListArgs,
  type UiTodayWorkSearchArgs,
} from '@/ui/today.work.ui';
import {
  type CreateTodayWorkItemInput,
  type CreateTodayWorkItemMutationVariables,
  type MutationDeleteTodayWorkItemArgs,
  type QueryWorksArgs,
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

  const works = (searchArgs: UiTodayWorkSearchArgs) => {
    const { onResult, onError } = useQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      date: searchArgs.date,
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
                id: Number(item?.id),
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
        detail: error.message,
        life: 300,
      };
    });
  };

  const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
    input.time = Number(input.time);

    if (!CreateTodayWorkItemInputValidator.safeParse(input).success) {
      toast.value = {
        detail: '요청 데이터 확인',
        life: 300,
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
        detail: error.message,
        life: 300,
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
        detail: error.message,
        life: 300,
      };
    });
  };

  const deleteTodayWorkItem = async (id: number) => {
    const { mutate } = useMutation<WorkItem, MutationDeleteTodayWorkItemArgs>(DELETE_TODAY_WORK_ITEM_MUTATION, {
      variables: {
        id: String(id),
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
        detail: error.message,
        life: 300,
      };
    });
  };

  return {
    todayWorkInputArgs,
    todayWorkListArgs,
    todayWorkSearchArgs,
    createTodayWorkItem,
    deleteTodayWorkItem,
    updateTodayWorkItemForTransfer,
    sendWeeklyReport,
    works,
  };
};

export { useTodayWork };
