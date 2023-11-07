<template>
  <p class="text-xl">
    환영합니다. <b> {{ userName }} </b>님
  </p>
</template>

<script setup lang="ts">
import { auth } from '@/composables/firebase';
import { ref } from 'vue';

const userName = ref(auth.currentUser?.displayName);
</script>
