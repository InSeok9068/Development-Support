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
import { CreateTodayWorkItemInputSchema, UpdateTodayWorkItemForTransferInputSchema } from '@support/shared/validators';
import dayjs from 'dayjs';
import { ref } from 'vue';
const { safeParseIfErrorToast } = useValidator();

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

  const works = async (searchArgs: UiTodayWorkSearchArgs) => {
    const { apolloQuery } = useApolloQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      input: {
        startDate: searchArgs.date,
        endDate: searchArgs.date,
      },
    });

    const result = await apolloQuery();

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
