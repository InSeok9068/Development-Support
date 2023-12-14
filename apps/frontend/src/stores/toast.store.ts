import type { UiToastArgs } from '@/ui/common.ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toast = ref<UiToastArgs>();

  return { toast };
});
