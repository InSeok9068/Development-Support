<template>
  <div class="card col-12">
    <Button label="스크랩 NOW" size="small" @click="onClickNowScrapingNewsletters()" />
    <TabView>
      <TabPanel header="전체">
        <DataTable :value="newsletterListArgs.item" paginator :rows="20" :rows-per-page-options="[20, 50, 100]">
          <Column field="source" header="소스"></Column>
          <Column field="title" header="제목">
            <template #body="slotProps">
              <a :href="slotProps.data.sourceLink" target="_blank" rel="noopener noreferrer">{{
                slotProps.data.title
              }}</a>
            </template>
          </Column>
          <Column header="요약">
            <template #body="slotProps">
              <Button
                label="(AI) 요약보기"
                type="button"
                severity="help"
                rounded
                @click="aiSummary(slotProps.data.id)"
              ></Button>
            </template>
          </Column>
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
import { useDialog } from '@/composables/dialog';
import { useNewsletter } from '@/composables/newsletter/newsletter';
import { onMounted } from 'vue';
const { newsletters, nowScrapingNewsletters, newslettersSearchArgs, newsletterListArgs } = useNewsletter();
const { dialog } = useDialog();

onMounted(() => newsletters(newslettersSearchArgs.value));

const aiSummary = (id: string) => {
  dialog.value.message = '준비 중입니다!';
  dialog.value.show = true;
};

const onClickNowScrapingNewsletters = async () => {
  await nowScrapingNewsletters();
};
</script>

<style lang="scss" scoped></style>
