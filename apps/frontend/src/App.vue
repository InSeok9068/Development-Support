<template>
  <AppLayoutVue />
</template>

<script setup lang="ts">
import { apolloClient } from '@/composables/use.grahpql.client';
import { provideApolloClient } from '@vue/apollo-composable';
import { onBeforeMount } from 'vue';
import AppLayoutVue from './layouts/AppLayout.vue';

onBeforeMount(() => {
  provideApolloClient(apolloClient);
});
</script>
