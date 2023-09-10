<template>
  메인
  <button @click.prevent.stop="apiTest()">API 테스트</button>
</template>

<script setup lang="ts">
// console.log(this.msg);
import { usePlugin } from '@/composables/plugin';
import { gql } from '@apollo/client/core';
const { $graphql } = usePlugin();
const apiTest = () => {
  $graphql.client
    .query({
      query: gql`
        query users {
          user {
            username
          }
        }
      `,
    })
    .then((result) => console.log(result));
};
</script>
