<template>
  <router-view />
</template>

<script setup lang="ts">
import { apolloClient } from '@/composables/use.grahpql.client';
import { provideApolloClient } from '@vue/apollo-composable';
import { onMounted } from 'vue';

onMounted(() => {
  provideApolloClient(apolloClient);
});
</script>
