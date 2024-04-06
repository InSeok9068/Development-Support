import { useApolloQuery } from '@/composables/use.apollo.query';
import { useValidator } from '@/composables/validator';
import { WORKS_QUERY } from '@/graphql/operations/today.work.operation';
import type { UiWorkItemArgs } from '@/ui/work.list.ui';
import type { QueryWorksArgs, WorksInput, WorksQuery } from '@support/shared/types';
import { WorksInputSchema } from '@support/shared/validators';
import { ref } from 'vue';

const useWorkList = () => {
  const { safeParseIfErrorToast } = useValidator();

  const workListSearchArgs = ref<WorksInput>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const workListArgs = ref<UiWorkItemArgs[]>([]);

  const works = async (workListSearchArgs: WorksInput) => {
    if (!safeParseIfErrorToast(WorksInputSchema().safeParse(workListSearchArgs))) {
      return;
    }

    const { apolloQuery } = useApolloQuery<WorksQuery, QueryWorksArgs>(WORKS_QUERY, {
      input: workListSearchArgs,
    });

    const result = await apolloQuery();

    workListArgs.value = result.data.works.flatMap((work) =>
      work!.workItems.map((item) => ({
        date: item.createdAt,
        title: work!.title,
        content: item.content,
        time: item.time,
      })),
    );
  };

  return {
    workListSearchArgs,
    workListArgs,
    works,
  };
};

export { useWorkList };
