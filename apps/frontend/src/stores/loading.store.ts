import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false);

  // loading = useGlobalQueryLoading();
  // loading = useGlobalMutationLoading();

  return { loading };
});
