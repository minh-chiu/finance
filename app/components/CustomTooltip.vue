<script setup lang="ts">
import { format } from "date-fns";
import { formatCurrency } from "~/pages/transactions/column";

const props = defineProps<{
  title: string;
  data: {
    name: string;
    color: string;
    value: any;
  }[];
}>();

const income = props.data.find((i) => i.name === "income")?.value;
const expenses = props.data.find((i) => i.name === "expenses")?.value;
</script>

<template>
  <div class="overflow-hidden rounded-sm border bg-white shadow-sm">
    <div class="bg-muted p-2 px-3 text-sm text-muted-foreground">
      {{ format(title, "MMM dd, yyyy") }}
    </div>

    <Separator />

    <div class="space-y-1 p-2 px-3">
      <div class="flex items-center justify-between gap-x-4">
        <div class="flex items-center gap-x-2">
          <div class="size-1.5 rounded-full bg-blue-500" />
          <p class="text-sm text-muted-foreground">Income</p>
        </div>

        <p class="text-right text-sm font-medium">
          {{ formatCurrency(income) }}
        </p>
      </div>

      <div class="flex items-center justify-between gap-x-4">
        <div class="flex items-center gap-x-2">
          <div class="size-1.5 rounded-full bg-rose-500" />
          <p class="text-sm text-muted-foreground">Expenses</p>
        </div>

        <p class="text-right text-sm font-medium">
          {{ formatCurrency(expenses) }}
        </p>
      </div>
    </div>
  </div>
</template>
