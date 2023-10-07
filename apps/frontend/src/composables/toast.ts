import { useToastStore } from '@/stores/toast.store';
import { storeToRefs } from 'pinia';

export const useToast = () => {
  const { toasts } = storeToRefs(useToastStore());
  const { showToast } = useToastStore();

  return {
    toasts,
    showToast,
  };
};
