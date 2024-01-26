import { useToast } from '@/composables/toast';
import type { SafeParseReturnType } from 'zod';
const { toast } = useToast();

export const useValidator = () => {
  const safeParseIfErrorToast = (result: SafeParseReturnType<any, any>) => {
    const isParse = result.success;
    if (!isParse) {
      toast.value = {
        ...toast.value,
        detail: result.error.errors[0].message,
      };
    }
    return isParse;
  };

  return {
    safeParseIfErrorToast,
  };
};
