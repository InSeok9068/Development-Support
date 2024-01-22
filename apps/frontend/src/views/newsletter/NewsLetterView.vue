<template>
  <div class="card col-12">
    <TabView>
      <TabPanel header="전체">
        <DataTable :value="newsletterListArgs.item" table-style="min-width: 50rem">
          <Column field="source" header="소스"></Column>
          <Column field="title" header="제목">
            <template #body="slotProps">
              <a :href="slotProps.data.sourceLink">{{ slotProps.data.title }}</a>
            </template>
          </Column>
          <Column field="action" header="요약"></Column>
        </DataTable>
      </TabPanel>
      <TabPanel header="GeekNews">
        <p class="m-0">GeekNews</p>
      </TabPanel>
      <TabPanel header="요즘 IT">
        <p class="m-0">요즘 IT</p>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { useNewsletter } from '@/composables/newsletter/newsletter';
import { onMounted } from 'vue';
const { newsletters, newslettersSearchArgs, newsletterListArgs } = useNewsletter();

onMounted(() => newsletters(newslettersSearchArgs.value));
</script>

<style lang="scss" scoped></style>
