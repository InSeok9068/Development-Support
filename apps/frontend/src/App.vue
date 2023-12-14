<template>
  <AppLayoutVue />
</template>

<script setup lang="ts">
import { apolloClient } from '@/composables/use.grahpql.client';
import { provideApolloClient } from '@vue/apollo-composable';
import { onMounted } from 'vue';
import AppLayoutVue from './layouts/AppLayout.vue';

onMounted(() => {
  provideApolloClient(apolloClient);
});
</script>
