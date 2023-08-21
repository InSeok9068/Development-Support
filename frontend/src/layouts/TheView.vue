<template>
  <div id="wrap">
    <!--가변으로 변경되는 페이지 영역-->
    <!-- <RouterView :key="$route.fullPath"></RouterView> -->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
