import type { UiToastArgs } from '@/ui/common.ui';
import { timeoutMs } from '@support/shared/utils/time.util';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<UiToastArgs[]>([]);

  const showToast = (title: string, message: string) => {
    toasts.value = [...toasts.value, { title, message, show: false }];
    //애니메이션 알고리즘
    setTimeout(() => {
      toasts.value.forEach((toast) => {
        if (toast.show) return;
        toast.show = true; //step1 : start show animation
        timeoutMs({ ms: 2500, tag: toast }).then((obj) => {
          (obj.tag as UiToastArgs).show = false; //step2 start hide animation
          timeoutMs({ ms: 300, tag: obj.tag }).then((_) => toasts.value.shift()); //step3 remove
        }); // end of step2
      });
    }, 1);
  };

  return { toasts, showToast };
});
