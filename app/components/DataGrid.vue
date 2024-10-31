<script setup lang="ts">
import { startOfDay } from "date-fns";
import { summaryApi } from "~/apis/0-summary.api";
import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";
import { formatDataRange } from "~/utils/helpers/format-data-range.helper";

const route = useRoute();

const from = computed(() => route.query.from as string);
const to = computed(() => route.query.to as string);
const { data: accounts } = useGetAccounts();
const accountId = computed(() => {
  return accounts.value?.find(
    (account) => account.title === (route.query.account as string),
  )?._id;
});

const dateRangeLabel = computed(() => {
  return formatDataRange({ from: from.value, to: to.value });
});

const { data, status } = useAsyncData(
  "summaries",
  () =>
    summaryApi.getTransactionStats({
      from: from.value ? startOfDay(from.value).toISOString() : undefined,
      to: to.value ? startOfDay(to.value).toISOString() : undefined,
      accountId: accountId.value,
    }),
  {
    watch: [from, to, accountId],
    dedupe: "defer",
  },
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
