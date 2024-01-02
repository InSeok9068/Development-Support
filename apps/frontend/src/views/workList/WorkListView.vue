<template>
  <div class="card col-12">
    <DataTable :value="workListArgs.item">
      <Column field="date" header="일자"></Column>
      <Column field="title" header="제목"></Column>
      <Column field="content" header="내용"></Column>
      <Column field="time" header="시간"></Column>
      <Column field="tag" header="태그"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useWorkList } from '@/composables/workList/work.list';
import { onMounted } from 'vue';
const { works, workListArgs } = useWorkList();
onMounted(() => works());
</script>

<style lang="scss" scoped></style>
