<template>
  <TheLayout></TheLayout>
  <AppToastVue></AppToastVue>
</template>

<script setup lang="ts">
import AppToastVue from '@/components/app/AppToast.vue';
import { apolloClient } from '@/composables/use.grahpql.client';
import TheLayout from '@/layouts/TheLayout.vue';
import { provideApolloClient } from '@vue/apollo-composable';
import { onMounted } from 'vue';

onMounted(() => {
  provideApolloClient(apolloClient);
});
</script>
