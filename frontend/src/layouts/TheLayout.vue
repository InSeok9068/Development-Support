<template>
  <div class="">
    <TheLayoutHeader />

    <TheLayoutDrawer>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </TheLayoutDrawer>

    <TheLayoutContainer>
      <router-view />
    </TheLayoutContainer>

    <TheLayoutFooter />
  </div>
</template>

<script setup lang="ts">
import TheLayoutHeader from './TheLayoutHeader.vue';
import TheLayoutFooter from './TheLayoutFooter.vue';
import TheLayoutDrawer from './TheLayoutDrawer.vue';
import TheLayoutContainer from './TheLayoutContainer.vue';
</script>
