<template>
  메인
  <button @click.prevent.stop="apiTest()">API 테스트</button>
</template>

<script setup lang="ts">
import { apolloClient } from '@/composables/use.grahpql.client';
import { gql } from '@apollo/client/core';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';

const apiTest = () => {
  const { result } = provideApolloClient(apolloClient)(() =>
    useQuery(gql`
      query users {
        user {
          username
        }
      }
    `),
  );

  console.log(result.value);
};
</script>
