import type { UiToastArgs } from '@/ui/common.ui';
import { timeoutMs } from '@support/shared/utils/time.util';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<UiToastArgs[]>([]);

  const showToast = ({ title = '알림', message }: UiToastArgs) => {
    toasts.value = [...toasts.value, { title, message }];
    setTimeout(() => {
      toasts.value.forEach((toast) => {
        const appToast = document.getElementById('appToast')! as HTMLDialogElement;
        appToast.showModal();
        timeoutMs({ ms: 2500, tag: toast }).then((obj) => {
          appToast.close();
          timeoutMs({ ms: 300, tag: obj.tag }).then((_) => toasts.value.shift());
        });
      });
    }, 1);
  };

  return { toasts, showToast };
});
