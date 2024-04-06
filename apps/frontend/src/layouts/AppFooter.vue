<template>
  <div class="layout-footer">
    <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
    by
    <span class="ml-2 font-medium">개발도우미</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const logoUrl = computed(() => {
  return `layout/images/logo.svg`;
});
</script>

<style lang="scss" scoped></style>
