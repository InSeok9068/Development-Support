import { useToast } from '@/composables/toast';
import { useApolloQuery } from '@/composables/use.apollo.query';
import { WORKS_QUERY } from '@/graphql/operations/today.work.operation';
import type { UiWorkItemArgs, UiWorkListArgs, UiWorkListSearchArgs } from '@/ui/work.list.ui';
import type { QueryWorksArgs, WorksQuery } from '@support/shared/types';
import { timeUtil, toMillisecondString } from '@support/shared/utils/time.util';
import { ref } from 'vue';
const { toast } = useToast();

const useWorkList = () => {
  const workListSearchArgs = ref<UiWorkListSearchArgs>({
    stratDate: timeUtil.today('YYYY-MM-DD'),
    endDate: timeUtil.today('YYYY-MM-DD'),
  });

  const workListArgs = ref<UiWorkListArgs>({
    item: [] as UiWorkItemArgs[],
  });

  const works = async (workListSearchArgs: UiWorkListSearchArgs) => {
    const { apolloQuery } = useApolloQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      input: {
        startDate: workListSearchArgs.stratDate,
        endDate: workListSearchArgs.endDate,
      },
    });

    const result = await apolloQuery();

    workListArgs.value = {
      item: result.data?.works!.flatMap((work) =>
        work!.workItems!.map((item) => ({
          date: toMillisecondString({
            dateTime: item!.createdAt,
            outFormat: 'YYYY-MM-DD',
          }),
          title: work!.title,
          content: item!.content,
          time: item!.time,
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
