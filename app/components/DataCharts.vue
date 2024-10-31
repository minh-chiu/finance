<script setup lang="ts">
import { startOfDay } from "date-fns";
import { summaryApi } from "~/apis/0-summary.api";
import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";

const route = useRoute();

const from = computed(() => route.query.from as string);
const to = computed(() => route.query.to as string);
const { data: accounts } = useGetAccounts();
const accountId = computed(() => {
  return accounts.value?.find(
    (account) => account.title === (route.query.account as string),
  )?._id;
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
  <div v-if="status === 'pending'">Loading...</div>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-6">
    <template v-if="status === 'pending'">
      <div class="col-span-1 lg:col-span-3 xl:col-span-4">
        <ChartLoading />
      </div>

      <div class="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPieLoading />
      </div>
    </template>
    <template v-else>
      <div class="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart :data="data?.days" />
      </div>

      <div class="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie :data="data?.categories" />
      </div>
    </template>
  </div>
</template>
