<script setup lang="ts">
import {
  useCurrencyInput,
  type CurrencyInputOptions,
} from "vue-currency-input";

interface Props {
  modelValue?: number;
  options: CurrencyInputOptions;
}

const props = defineProps<Props>();

const { inputRef, formattedValue, setValue } = useCurrencyInput(props.options);

watch(
  () => props.modelValue,
  (value: any) => setValue(value),
);
</script>

<template>
  <input
    ref="inputRef"
    v-model="formattedValue"
    class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    density="compact"
    variant="solo"
  >
</template>
