import { type UiTodayWorkInputArgs, type UiTodayWorkListArgs } from '@/ui/today.work.ui';
import { ref } from 'vue';

const useTodayWork = () => {
  const todayWorkInputArgs = ref<UiTodayWorkInputArgs>({
    title: '',
    desc: '',
  });

  const todayWorkListArgs = ref<UiTodayWorkListArgs>({
    item: [],
  });

  return { todayWorkInputArgs, todayWorkListArgs };
};

export { useTodayWork };
