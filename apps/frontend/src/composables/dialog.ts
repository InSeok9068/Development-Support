import { useDialogStore } from '@/stores/dialog.store';
import { storeToRefs } from 'pinia';

export const useDialog = () => {
  const { dialog } = storeToRefs(useDialogStore());

  return {
    dialog,
  };
};
