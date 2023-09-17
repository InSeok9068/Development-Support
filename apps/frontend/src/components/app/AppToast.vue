<template>
  <div v-for="({ title, message }, index) in toasts" :key="index">
    <dialog id="appToast" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <p class="py-4">{{ message }}</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/toast';
const { toasts } = useToast();
</script>
