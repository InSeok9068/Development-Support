import type { UiAuthArgs } from '@/ui/common.ui';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authArgs = ref<UiAuthArgs>({
    isAuth: false,
    requiredAuth: false,
  });

  return { authArgs };
});
