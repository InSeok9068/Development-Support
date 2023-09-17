import type { UiToastArgs } from '@/ui/common.ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<UiToastArgs[]>([]);

  const showToast = ({ title = '알림', message }: UiToastArgs) => {
    toasts.value = [...toasts.value, { title, message }];
    setTimeout(() => {
      toasts.value.forEach(() => {
        const appToast = document.getElementById('appToast')! as HTMLDialogElement;
        appToast.showModal();
      });
    }, 1);
  };

  return { toasts, showToast };
});
