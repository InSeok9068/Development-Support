import { auth } from '@/composables/firebase';
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from 'pinia';

export const useAuth = () => {
  const { authArgs } = storeToRefs(useAuthStore());

  const login = () => {
    authArgs.value.requiredAuth = true;
  };

  const logout = () => {
    auth.signOut();
  };

  return { authArgs, login, logout };
};
