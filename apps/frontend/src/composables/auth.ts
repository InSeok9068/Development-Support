import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

export const useAuth = () => {
  const { authArgs } = storeToRefs(useAuthStore());

  const initAuthArgs = () => {
    authArgs.value = {
      isAuth: false,
    };
  };

  return { authArgs, initAuthArgs };
};
