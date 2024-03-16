import { useApolloMutation } from '@/composables/use.apollo.mutation';
import { useApolloQuery } from '@/composables/use.apollo.query';
import { useValidator } from '@/composables/validator';
import {
  CREATE_TODAY_WORK_ITEM_MUTATION,
  DELETE_TODAY_WORK_ITEM_MUTATION,
  SEND_WEEKLY_REPORT_MUTATION,
  SUGGESTIONS_QUERY,
  UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER,
  WORKS_QUERY,
} from '@/graphql/operations/today.work.operation';
import { type UiTodayWorkItemArgs, type UiTodayWorkSuggestions } from '@/ui/today.work.ui';
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
  type WorksInput,
  type WorksQuery,
} from '@support/shared/types';
import { timeUtil } from '@support/shared/utils';
import { CreateTodayWorkItemInputSchema, UpdateTodayWorkItemForTransferInputSchema } from '@support/shared/validators';
import { ref } from 'vue';
const { safeParseIfErrorToast } = useValidator();

const useTodayWork = () => {
  const todayWorkInputArgs = ref<CreateTodayWorkItemInput>({
    title: '',
    content: '',
    time: 1,
    date: timeUtil.today('YYYY-MM-DD'),
  });

  const todayWorkListArgs = ref<UiTodayWorkItemArgs[]>([]);

  const todayWorkSearchArgs = ref<WorksInput>({
    startDate: timeUtil.today('YYYY-MM-DD'),
    endDate: timeUtil.today('YYYY-MM-DD'),
  });

  const suggestionsArgs = ref<UiTodayWorkSuggestions>({
    suggestion: [],
  });

  const works = async (searchArgs: WorksInput) => {
    const { apolloQuery } = useApolloQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      input: searchArgs,
    });

    const result = await apolloQuery();

    todayWorkListArgs.value = result.data.works.map((work) => ({
      id: Number(work?.id),
      title: work?.title,
      time: work?.time,
      subItem: work?.workItems.map((item) => ({
        itemId: Number(item.itemId),
        content: item.content,
        time: item.time,
      })),
    })) as UiTodayWorkItemArgs[];
  };

  const createTodayWorkItem = async (input: CreateTodayWorkItemInput) => {
    if (!safeParseIfErrorToast(CreateTodayWorkItemInputSchema().safeParse(input))) {
      return;
    }

    const { apolloMutation } = useApolloMutation<Work, CreateTodayWorkItemMutationVariables>(
      CREATE_TODAY_WORK_ITEM_MUTATION,
      {
        variables: {
          input,
        },
      },
    );

    await apolloMutation();
    await works(todayWorkSearchArgs.value);
  };

  const updateTodayWorkItemForTransfer = async (input: UpdateTodayWorkItemForTransferInput) => {
    if (!safeParseIfErrorToast(UpdateTodayWorkItemForTransferInputSchema().safeParse(input))) {
      return;
    }

    const { apolloMutation } = useApolloMutation<Work, UpdateTodayWorkItemForTransferMutationVariables>(
      UPDATE_TODAY_WORK_ITEM_FOR_TRANSFER,
      {
        variables: {
          input,
        },
      },
    );

    await apolloMutation();
    await works(todayWorkSearchArgs.value);
  };

  const deleteTodayWorkItem = async (itemId: number) => {
    const { apolloMutation } = useApolloMutation<WorkItem, MutationDeleteTodayWorkItemArgs>(
      DELETE_TODAY_WORK_ITEM_MUTATION,
      {
        variables: {
          itemId: String(itemId),
        },
      },
    );

    await apolloMutation();
    await works(todayWorkSearchArgs.value);
  };

  const sendWeeklyReport = async () => {
    const { apolloMutation } = useApolloMutation<boolean>(SEND_WEEKLY_REPORT_MUTATION);

    await apolloMutation();
  };

  const suggestions = async (title: string) => {
    const { apolloQuery } = useApolloQuery<SuggestionsQuery, SuggestionsQueryVariables>(SUGGESTIONS_QUERY, {
      input: {
        title,
      },
    });

    const result = await apolloQuery();

    suggestionsArgs.value = {
      suggestion: result.data?.suggestions?.map((suggestion) => suggestion?.title) as string[],
    };
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
