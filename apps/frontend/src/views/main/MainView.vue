<template>
  메인
  <button @click.prevent.stop="apiTest()">API 테스트</button>
</template>

<script setup lang="ts">
import { apolloClient } from '@/composables/use.grahpql.client';
import { gql } from '@apollo/client/core';
import { type User } from '@support/shared/types';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';

interface Data<T> {
  user: T;
}

const apiTest = () => {
  const { result } = provideApolloClient(apolloClient)(() =>
    useQuery<Data<User>>(gql`
      query users {
        user {
          username
        }
      }
    `),
  );

  console.log(result.value?.user.username);
};
</script>
