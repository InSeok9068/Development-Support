<template>
  <div class="card col-12">
    <div class="flex gap-2">
      <Calendar v-model="dates" selection-mode="range" :manual-input="false" show-icon date-format="yy-mm-dd" />
      <Button type="button" label="검색" icon="pi pi-search" :loading="loading" @click="onClickSearch()" />
    </div>
  </div>
  <div class="card col-12">
    <DataTable :value="workListArgs" show-gridlines paginator :rows="5" :rows-per-page-options="[5, 10, 20, 50]">
      <Column field="date" header="일자" sortable />
      <Column field="title" header="제목" sortable />
      <Column field="content" header="내용" sortable />
      <Column field="time" header="시간" sortable />
      <Column field="tag" header="태그" sortable />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useWorkList } from '@/composables/workList/work.list';
import { onMounted, ref, watch } from 'vue';
const { works, workListSearchArgs, workListArgs } = useWorkList();

const loading = ref(false);
const dates = ref<Date[]>([new Date(), new Date()]);

watch(
  () => dates.value,
  (cur, _) => {
    workListSearchArgs.value = {
      startDate: dates.value?.at(0) ?? new Date(),
      endDate: dates.value?.at(1) ?? new Date(),
    };
  },
);

onMounted(() => works(workListSearchArgs.value));

const onClickSearch = () => {
  works(workListSearchArgs.value);
};
</script>

<style lang="scss" scoped></style>
