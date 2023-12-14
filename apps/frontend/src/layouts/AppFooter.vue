<template>
  <div class="layout-footer">
    <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
    <span class="font-medium ml-2">개발 도우미</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const logoUrl = computed(() => {
  return `layout/images/logo.svg`;
});
</script>

<style lang="scss" scoped></style>
