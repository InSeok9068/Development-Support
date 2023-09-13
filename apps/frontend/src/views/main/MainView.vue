<template>
  메인
  <button @click.prevent.stop="apiTest()">API 테스트</button>
</template>

<script setup lang="ts">
import { apolloClient } from '@/composables/use.grahpql.client';
import { getUsers } from '@/graphql/operations/main.operation';
import { type GetUsersQuery } from '@support/shared/types';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';

const apiTest = () => {
  const { result } = provideApolloClient(apolloClient)(() => useQuery<GetUsersQuery>(getUsers));

  console.log(result.value?.user?.username);
};
</script>
