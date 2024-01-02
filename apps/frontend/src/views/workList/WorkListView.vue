<template>
  <div class="card col-12">
    <DataTable :value="products">
      <Column header="제목"></Column>
      <Column header="내용"></Column>
      <Column header="시간"></Column>
      <Column header="태그"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
