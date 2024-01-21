<template>
  <div class="card col-12">
    <TabView>
      <TabPanel header="전체">
        <DataTable :value="products" table-style="min-width: 50rem">
          <Column field="code" header="장소"></Column>
          <Column field="name" header="제목"></Column>
          <Column field="category" header="스크랩 시간"></Column>
          <Column field="quantity" header="요약"></Column>
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

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
