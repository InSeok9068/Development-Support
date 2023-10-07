<template>
  메인
  <button @click.prevent.stop="apiTest()">API 테스트</button>
</template>

<script setup lang="ts">
import { apolloClient } from '@/composables/use.grahpql.client';
import { GET_USERS_QUERY } from '@/graphql/operations/main.operation';
import { type GetUsersQuery } from '@support/shared/types';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';

const apiTest = () => {
  const { result } = provideApolloClient(apolloClient)(() => useQuery<GetUsersQuery>(GET_USERS_QUERY));

  console.log(result.value?.user?.username);
};
</script>
