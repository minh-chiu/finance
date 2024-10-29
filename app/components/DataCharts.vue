<script setup lang="ts">
import { summaryApi } from "~/apis/0-summary.api";

const route = useRoute();
const { from = undefined, to = undefined }: { from?: string; to?: string } =
  route.query;

const { data, status } = useAsyncData("summaries", () =>
  summaryApi.getTransactionStats({
    from,
    to,
  }),
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
