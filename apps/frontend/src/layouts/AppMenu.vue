<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
      <li v-if="item.separator" class="menu-separator" />
    </template>
  </ul>
</template>

<script setup>
import { MENUS_QUERY } from '@/graphql/operations/menu.operation';
import { useQuery } from '@vue/apollo-composable';
import { onMounted, ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([]);

onMounted(async () => {
  const { onResult } = useQuery(MENUS_QUERY);
  onResult((result) => {
    if (!result.loading) {
      const data = result.data;
      if (data) {
        model.value = data.menus.map((menu) => ({
          label: menu.label,
          items: menu.children.map((menu) => ({
            label: menu.label,
            icon: menu.icon,
            to: menu.to,
            url: menu.url,
            target: menu.target,
          })),
        }));
      }
    }
  });
});
</script>

<style lang="scss" scoped></style>
