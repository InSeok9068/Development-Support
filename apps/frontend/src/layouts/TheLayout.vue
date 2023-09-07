<template>
  <div class="mx-auto h-screen w-full p-5">
    <div class="flex space-x-4">
      <AppCard v-for="(item, index) in cardArgsList" :key="index" v-model="cardArgsList[index]" />
    </div>
    <div class="divider"></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
  <TheLayoutFooter></TheLayoutFooter>
</template>

<script setup lang="ts">
import AppCard from '@/components/app/AppCard.vue';
import { usePlugin } from '@/composables/plugin';
import type { UiCardArgs } from '@/ui/common.ui';
import { useRouter } from 'vue-router';
const router = useRouter();
const { $navi } = usePlugin();
const cardArgsList: UiCardArgs[] = [
  {
    title: '메인',
    move: () => $navi.main(router).main().go(),
  },
  {
    title: '대시보드',
    move: () => $navi.dashboard(router).dashboard().go(),
  },
  {
    title: '오늘 한일',
    move: () => $navi.todayWork(router).todayWork().go(),
  },
];
</script>
