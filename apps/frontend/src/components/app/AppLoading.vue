<template>
  <Dialog
    v-model:visible="loading"
    modal
    :pt="{
      root: {
        style: {
          'box-shadow': 'none',
        },
      },
      mask: {
        style: {
          animation: 'none',
          'background-color': 'unset',
        },
      },
    }"
  >
    <template #container="{}">
      <ProgressSpinner />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useLoading } from '@/composables/loading';
const { loading } = useLoading();
</script>
