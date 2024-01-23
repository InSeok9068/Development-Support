import { useLoadingStore } from '@/stores/loading.store';
import { storeToRefs } from 'pinia';

export const useLoading = () => {
  const { loading } = storeToRefs(useLoadingStore());

  return {
    loading,
  };
};
