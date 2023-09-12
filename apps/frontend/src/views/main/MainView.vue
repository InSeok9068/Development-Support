<template>
  메인
  <button @click.prevent.stop="apiTest()">API 테스트</button>
</template>

<script setup lang="ts">
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

import { apolloClient } from '@/composables/use.grahpql.client';
import { gql } from '@apollo/client/core';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';

const apiTest = () => {
  // const apolloClient = new ApolloClient({
  //   uri: import.meta.env.VITE_GRAPHQL_URL,
  //   cache: new InMemoryCache(),
  // });

  // apolloClient
  //   .query({
  //     query: gql`
  //       query users {
  //         user {
  //           username
  //         }
  //       }
  //     `,
  //   })
  //   .then((result) => console.log(result));

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
