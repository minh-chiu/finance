<script setup lang="ts">
import { DonutChart } from "@/components/ui/chart-donut";
import { formatCurrency } from "~/pages/transactions/column";
import type { Category } from "~/validations/category.validation";
interface Props {
  data?: {
    value: number;
    category: Category;
  }[];
}

const props = defineProps<Props>();

const categories = computed(() => {
  return (
    props.data?.map((d) => ({
      amount: d.value,
      name: d.category.name,
    })) || []
  );
});

const chartType = ref<"donut" | "pie">("pie");

const onTypeChange = (type: any) => {
  chartType.value = type;
};

const valueFormatter = (tick: number | Date) =>
  typeof tick === "number"
    ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}`
    : "";

const colors = ["orange", "yellow"];
</script>

<template>
  <Card class="border-none drop-shadow-sm">
    <CardHeader
      class="flex justify-between space-x-2 lg:flex-row lg:items-center lg:space-y-0"
    >
      <CardTitle class="line-clamp-1 text-xl" />

      <Select :model-value="chartType" @update:model-value="onTypeChange">
        <SelectTrigger class="h-9 rounded-md px-3 lg:w-auto">
          <SelectValue placeholder="Chart type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="pie">
            <div class="flex items-center">
              <Icon name="icon-park-outline:pie-two" class="mr-2 size-4" />
              <p class="line-clamp-1">Pie Chart</p>
            </div>
          </SelectItem>

          <SelectItem value="donut">
            <div class="flex items-center">
              <Icon name="teenyicons:donut-chart-outline" class="mr-2 size-4" />
              <p class="line-clamp-1">Donut Chart</p>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>

    <CardContent>
      <div
        v-if="!data?.length"
        class="gapy-y-4 flex h-[350px] w-full flex-col items-center justify-center"
      >
        <Icon name="mdi:file-outline" class="size-6 text-muted-foreground" />
        <p class="text-sm text-muted-foreground">No data for this period</p>
      </div>

      <div v-else>
        <DonutChart
          index="name"
          category="amount"
          :data="categories"
          :value-formatter="valueFormatter"
          :colors="colors"
          :type="chartType"
        />

        <!-- note -->
        <ul class="mx-4 my-4 flex flex-col space-y-2">
          <li
            v-for="(item, i) in categories"
            :key="item.name"
            class="flex items-center space-x-2"
          >
            <span
              class="size-2 rounded-full"
              :style="{ background: colors[i] }"
            />

            <div class="space-x-1">
              <span class="text-sm text-muted-foreground">{{ item.name }}</span>
              <span class="text-sm">{{ formatCurrency(item.amount) }}</span>
            </div>
          </li>
        </ul>
      </div>
    </CardContent>
  </Card>
</template>
