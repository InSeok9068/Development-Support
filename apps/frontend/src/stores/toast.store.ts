import type { UiToastArgs } from '@/ui/common.ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toast = ref<UiToastArgs>({
    severity: 'error',
    summary: '알림',
    detail: '',
    life: 3000,
  });

  return { toast };
});
