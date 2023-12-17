import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

export const useAuth = () => {
  const { authArgs } = storeToRefs(useAuthStore());

  return { authArgs };
};
