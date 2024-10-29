<script setup lang="ts">
import { summaryApi } from "~/apis/0-summary.api";
import { formatDataRange } from "~/utils/helpers/format-data-range.helper";

const route = useRoute();
const { from = undefined, to = undefined }: { from?: string; to?: string } =
  route.query;

const dateRangeLabel = formatDataRange({ to, from });
const { data, status } = useAsyncData("summaries", () =>
  summaryApi.getTransactionStats({
    from,
    to,
  }),
);
</script>

<template>
  <div class="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
    <template v-if="status === 'pending'">
      <DataCardLoading />
      <DataCardLoading />
      <DataCardLoading />
    </template>

    <template v-else>
      <DataCard
        title="Remaining"
        :value="data?.currentPeriod.remaining"
        :percentage-change="data?.remainingChange"
        icon="fa6-solid:piggy-bank"
        variant="default"
        :date-range="dateRangeLabel"
      />

      <DataCard
        title="Income"
        :value="data?.currentPeriod.income"
        :percentage-change="data?.incomeChange"
        icon="fa6-solid:arrow-trend-up"
        variant="default"
        :date-range="dateRangeLabel"
      />

      <DataCard
        title="Expenses"
        :value="data?.currentPeriod.expenses"
        :percentage-change="data?.expensesChange"
        icon="fa6-solid:arrow-trend-down"
        variant="default"
        :date-range="dateRangeLabel"
      />
    </template>
  </div>
</template>
