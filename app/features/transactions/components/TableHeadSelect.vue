<script setup lang="ts">
import { cn } from "~/lib/utils";

interface Props {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
}

interface Emits {
  (
    e: "change",
    payload: {
      columnIndex: number;
      value: string | null;
    },
  ): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const options = ["amount", "payee", "date"];

const currentSelection = computed(
  () => props.selectedColumns[`column_${props.columnIndex}`],
);

const onSelectChange = (value: string | null) => {
  emits("change", { columnIndex: props.columnIndex, value });
};
</script>

<template>
  <Select :value="currentSelection || ''" @update:model-value="onSelectChange">
    <SelectTrigger
      :class="
        cn(
          'border-none bg-transparent capitalize outline-none focus:ring-transparent focus:ring-offset-0',
          currentSelection && 'text-blue-500',
        )
      "
    >
      <SelectValue placeholder="Skip" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="skip">Skip</SelectItem>
      <SelectItem
        v-for="option in options"
        :key="option"
        :value="option"
        class="capitalize"
        :disabled="
          Object.values(selectedColumns).includes(option) &&
          selectedColumns[`column_${props.columnIndex}`] !== option
        "
        >{{ option }}</SelectItem
      >
    </SelectContent>
  </Select>
</template>

<style lang="scss" scoped></style>
