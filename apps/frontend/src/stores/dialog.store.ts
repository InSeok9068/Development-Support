import type { UiDialogArgs } from '@/ui/common.ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDialogStore = defineStore('dialog', () => {
  const dialog = ref<UiDialogArgs>({
    header: '알림',
    message: '',
    show: false,
  });

  return { dialog };
});
