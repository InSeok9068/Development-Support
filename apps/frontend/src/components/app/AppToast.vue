<template>
  <Toast />
</template>

<script setup lang="ts">
import { useToast } from '@/composables/toast';
import { useToast as useToastPrime } from 'primevue/usetoast';
import { watch } from 'vue';

const toastPrime = useToastPrime();
const { toast } = useToast();

watch(
  () => toast.value,
  (cur, _) => cur && openToast(),
);

const openToast = () => {
  toastPrime.add({
    severity: toast.value?.severity,
    summary: toast.value?.summary,
    detail: toast.value?.detail,
    life: toast.value?.life,
  });
};
</script>
