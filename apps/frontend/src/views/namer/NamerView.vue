<template>
  <div class="card col-12 flex">
    <form class="flex flex-column gap-5" @submit="onSubmit">
      <div class="flex align-items-center flex-wrap gap-3">
        <span class="flex">LANG</span>
        <div class="flex align-items-center">
          <RadioButton v-model="form.lang" input-id="class" name="lang" value="java" />
          <label for="class" class="ml-2">Java</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="form.lang" input-id="method" name="lang" value="typescript" />
          <label for="method" class="ml-2">Typescript</label>
        </div>
      </div>
      <div class="flex align-items-center flex-wrap gap-3">
        <span class="flex">TYPE</span>
        <div class="flex align-items-center">
          <RadioButton v-model="form.type" input-id="class" name="type" value="class" />
          <label for="class" class="ml-2">Class</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="form.type" input-id="method" name="type" value="method" />
          <label for="method" class="ml-2">Method</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="form.type" input-id="variable" name="type" value="variable" />
          <label for="variable" class="ml-2">Variable</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="form.type" input-id="url" name="type" value="url" />
          <label for="url" class="ml-2">URL</label>
        </div>
      </div>
      <div class="flex align-items-center flex-wrap gap-3">
        <span class="flex">CRUD</span>
        <div class="flex align-items-center">
          <RadioButton v-model="form.crud" input-id="create" name="crud" value="create" />
          <label for="create" class="ml-2">Create</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="form.crud" input-id="create" name="crud" value="read" />
          <label for="create" class="ml-2">Read</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="form.crud" input-id="create" name="crud" value="update" />
          <label for="create" class="ml-2">Update</label>
        </div>
        <div class="flex align-items-center">
          <RadioButton v-model="form.crud" input-id="create" name="crud" value="delete" />
          <label for="create" class="ml-2">Delete</label>
        </div>
      </div>
      <Textarea v-model="form.inpurt" rows="10" />
      <Button label="추천" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const form = ref({
  lang: '',
  type: '',
  crud: '',
  inpurt: '',
});
const onSubmit = () => {};
</script>

<style lang="scss" scoped></style>
