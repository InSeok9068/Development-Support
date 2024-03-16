<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card">
        <form class="flex flex-column gap-5">
          <div class="flex align-items-center flex-wrap gap-3">
            <span class="flex font-bold">LANG</span>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.lang" input-id="class" name="lang" value="java" />
              <label for="class" class="ml-2">Java</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.lang" input-id="method" name="lang" value="typescript" />
              <label for="method" class="ml-2">Typescript</label>
            </div>
          </div>
          <div class="flex align-items-center flex-wrap gap-3">
            <span class="flex font-bold">TYPE</span>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.type" input-id="class" name="type" value="class" />
              <label for="class" class="ml-2">Class</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.type" input-id="method" name="type" value="method" />
              <label for="method" class="ml-2">Method</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.type" input-id="variable" name="type" value="variable" />
              <label for="variable" class="ml-2">Variable</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.type" input-id="url" name="type" value="url" />
              <label for="url" class="ml-2">URL</label>
            </div>
          </div>
          <div class="flex align-items-center flex-wrap gap-3">
            <span class="flex font-bold">CRUD</span>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.crud" input-id="create" name="crud" value="create" />
              <label for="create" class="ml-2">Create</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.crud" input-id="create" name="crud" value="read" />
              <label for="create" class="ml-2">Read</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.crud" input-id="create" name="crud" value="update" />
              <label for="create" class="ml-2">Update</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="namerFormArgs.crud" input-id="create" name="crud" value="delete" />
              <label for="create" class="ml-2">Delete</label>
            </div>
          </div>
          <Textarea v-model="namerFormArgs.input" rows="10" />
          <Button type="button" label="추천" @click="onSubmit()" />
        </form>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card">
        <div class="flex flex-column gap-2">
          <span class="flex">
            <h3>결과보기</h3>
          </span>
          <Textarea v-model="nameSuggestionsArgs" rows="20" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamer } from '@/composables/namer/namer';
const { nameSuggestions, namerFormArgs, nameSuggestionsArgs } = useNamer();

const onSubmit = () => {
  nameSuggestions(namerFormArgs.value);
};
</script>

<style lang="scss" scoped></style>
