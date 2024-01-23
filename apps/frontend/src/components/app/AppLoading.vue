<template>
  <Dialog
    v-model:visible="loading"
    modal
    :pt="{
      root: {
        style: 'box-shadow : none',
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
// import { useGlobalMutationLoading } from '@vue/apollo-composable';
// const loading = useGlobalMutationLoading();
</script>
