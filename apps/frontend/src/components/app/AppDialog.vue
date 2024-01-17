<template>
  <Dialog
    v-model:visible="dialog.show"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="align-items-center justify-content-center inline-flex gap-2">
        <span class="white-space-nowrap font-bold">{{ dialog.header }}</span>
      </div>
    </template>
    <p class="m-0">
      {{ dialog.message }}
    </p>
    <template #footer>
      <Button label="Ok" icon="pi pi-check" autofocus @click="dialog.show = false" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import { watch } from 'vue';
const { dialog } = useDialog();

watch(
  () => dialog.value,
  (cur, _) => cur && openDialog(),
);

const openDialog = () => {
  dialog.value.show = true;
};
</script>
