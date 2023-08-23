<template>
  <div class="card w-52 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">
        {{ theArgs.title }}
      </h2>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" @click="theArgs.move">이동</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { UiCardArgs } from '@/ui/uiCommon';

const props = defineProps<{
  modelValue: UiCardArgs;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', args: UiCardArgs): void;
}>();

const theArgs = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', { ...props.modelValue, ...value }),
});
</script>
