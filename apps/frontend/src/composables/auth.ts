import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

export const useAuth = () => {
  const { certified } = storeToRefs(useAuthStore());

  return { certified };
};
