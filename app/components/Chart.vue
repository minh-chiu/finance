<script setup lang="ts">
import { format } from "date-fns";
import CustomTooltip from "~/components/CustomTooltip.vue";

interface Props {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

const { data = [] } = defineProps<Props>();

const chartType = ref("line");

const onTypeChange = (type: string) => {
  chartType.value = type;
};
</script>

<template>
  <Card class="border-none drop-shadow-sm">
    <CardHeader
      class="flex justify-between space-x-2 lg:flex-row lg:items-center lg:space-y-0"
    >
      <CardTitle class="line-clamp-1 text-xl">Transactions</CardTitle>

      <Select :model-value="chartType" @update:model-value="onTypeChange">
        <SelectTrigger class="h-9 rounded-md px-3 lg:w-auto">
          <SelectValue placeholder="Chart type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="area">
            <div class="flex items-center">
              <Icon name="carbon:chart-area-smooth" class="mr-2 size-4" />
              <p class="line-clamp-1">Area Chart</p>
            </div>
          </SelectItem>

          <SelectItem value="line">
            <div class="flex items-center">
              <Icon name="tabler:chart-line" class="mr-2 size-4" />
              <p class="line-clamp-1">Line Chart</p>
            </div>
          </SelectItem>

          <SelectItem value="bar">
            <div class="flex items-center">
              <Icon name="material-symbols:bar-chart" class="mr-2 size-4" />
              <p class="line-clamp-1">Bar Chart</p>
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

      <template v-else>
        <AreaChart
          v-if="chartType === 'area'"
          :data="data"
          index="date"
          :categories="['income', 'expenses']"
          :colors="['blue', 'orange']"
          :custom-tooltip="CustomTooltip"
          :y-formatter="
            (tick: number | Date) => {
              return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : '';
            }
          "
          :x-formatter="(_, index) => format(data[index]!.date, 'MMM dd, yyyy')"
        />

        <LineChart
          v-else-if="chartType === 'line'"
          :data="data"
          index="date"
          :categories="['expenses', 'income']"
          :colors="['blue', 'orange']"
          :y-formatter="
            (tick: number | Date) => {
              return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : '';
            }
          "
          :x-formatter="(_, index) => format(data[index]!.date, 'MMM dd, yyyy')"
          :custom-tooltip="CustomTooltip"
        />

        <BarChart
          v-else
          :data="data"
          index="date"
          :categories="['expenses', 'income']"
          :colors="['blue', 'orange']"
          :y-formatter="
            (tick: number | Date) => {
              return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : '';
            }
          "
          :x-formatter="(_, index) => format(data[index]!.date, 'MMM dd, yyyy')"
          :custom-tooltip="CustomTooltip"
        />
      </template>
    </CardContent>
  </Card>
</template>
