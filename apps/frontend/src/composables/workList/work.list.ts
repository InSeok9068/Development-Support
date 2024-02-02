import { useApolloQuery } from '@/composables/use.apollo.query';
import { useValidator } from '@/composables/validator';
import { WORKS_QUERY } from '@/graphql/operations/today.work.operation';
import type { UiWorkItemArgs, UiWorkListArgs, UiWorkListSearchArgs } from '@/ui/work.list.ui';
import type { QueryWorksArgs, WorksQuery } from '@support/shared/types';
import { timeUtil, toMillisecondString } from '@support/shared/utils/time.util';
import { WorksInputSchema } from '@support/shared/validators';
import { ref } from 'vue';
const { safeParseIfErrorToast } = useValidator();

const useWorkList = () => {
  const workListSearchArgs = ref<UiWorkListSearchArgs>({
    startDate: timeUtil.today('YYYY-MM-DD'),
    endDate: timeUtil.today('YYYY-MM-DD'),
  });

  const workListArgs = ref<UiWorkListArgs>({
    item: [] as UiWorkItemArgs[],
  });

  const works = async (workListSearchArgs: UiWorkListSearchArgs) => {
    if (!safeParseIfErrorToast(WorksInputSchema().safeParse(workListSearchArgs))) {
      return;
    }

    const { apolloQuery } = useApolloQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      input: workListSearchArgs,
    });

    const result = await apolloQuery();

    workListArgs.value = {
      item: result.data.works!.flatMap((work) =>
        work!.workItems.map((item) => ({
          date: toMillisecondString({
            dateTime: item!.createdAt,
            outFormat: 'YYYY-MM-DD',
          }),
          title: work!.title,
          content: item.content,
          time: item.time,
        })),
      ),
    };
  };

  return {
    workListSearchArgs,
    workListArgs,
    works,
  };
};

export { useWorkList };
