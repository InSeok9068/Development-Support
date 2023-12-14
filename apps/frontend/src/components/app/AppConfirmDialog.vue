<template>
  <ConfirmDialog />
</template>

<script setup lang="ts">
import { useConfirmDialog } from '@/composables/confirm.dialog';
import { useConfirm as useConfirmPrime } from 'primevue/useconfirm';
import { watch } from 'vue';
const { confirmDialog } = useConfirmDialog();
const confirmPrime = useConfirmPrime();

watch(
  () => confirmDialog.value,
  (cur, _) => cur && openConfirmDialog(),
);

const openConfirmDialog = () => {
  confirmPrime.require({
    header: confirmDialog.value?.header,
    message: confirmDialog.value?.message,
    icon: confirmDialog.value?.icon,
    accept: confirmDialog.value?.accept,
    reject: confirmDialog.value?.reject,
  });
};
</script>
