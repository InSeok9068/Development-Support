import { useToastStore } from '@/stores/toast.store';
import { storeToRefs } from 'pinia';

export const useToast = () => {
  const { toast } = storeToRefs(useToastStore());

  return {
    toast,
  };
};
