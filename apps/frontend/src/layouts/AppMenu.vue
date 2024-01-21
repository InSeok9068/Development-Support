<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i"></AppMenuItem>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
  {
    label: 'Home',
    items: [
      { label: '대시보드', icon: 'pi pi-fw pi-home', to: '/dashboard' },
      { label: '뉴스레터', icon: 'pi pi-fw pi-truck', to: '/newsletter' },
    ],
  },
  {
    label: 'Pages',
    items: [
      { label: '오늘 한일', icon: 'pi pi-fw pi-check-square', to: '/today-work' },
      { label: '한일 목록', icon: 'pi pi-fw pi-list', to: '/work-list' },
      { label: '기술 스펙', icon: 'pi pi-fw pi-server', to: '/tech-spec' },
    ],
  },
]);
</script>

<style lang="scss" scoped></style>
