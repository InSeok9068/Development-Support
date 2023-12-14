import { useConfirmDialogStore } from '@/stores/confirm.dialog.store';
import { storeToRefs } from 'pinia';

export const useConfirmDialog = () => {
  const { confirmDialog } = storeToRefs(useConfirmDialogStore());

  return {
    confirmDialog,
  };
};
