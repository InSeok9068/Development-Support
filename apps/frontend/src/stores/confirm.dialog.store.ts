import type { UiConfirmDialogArgs } from '@/ui/common.ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfirmDialogStore = defineStore('confirmDialog', () => {
  const confirmDialog = ref<UiConfirmDialogArgs>();

  return { confirmDialog };
});
