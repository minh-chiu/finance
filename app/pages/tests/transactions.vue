<script setup lang="ts">
import type { NuxtApp } from "#app";
import { transactionApi } from "~/apis/0-transaction.api";

const { data } = useAsyncData("t-123123", () => transactionApi.getAll(), {
  server: false,
  getCachedData: (key: string, nuxtApp: NuxtApp) => {
    // console.log({
    //   key,
    //   nuxtApp: nuxtApp.payload.data[key],
    //   isHydrating: nuxtApp.isHydrating,
    // });
    return nuxtApp.payload.data[key] || null;
  },
});
</script>

<template>
  <div>
    <Button @click="navigateTo('/tests/transactions')">Transactions</Button>
    <Button @click="navigateTo('/tests/accounts')">Accounts</Button>
    <Button @click="navigateTo('/tests/')">Categories</Button>
    <Button @click="navigateTo('/tests/users')">Users</Button>
    <div>{{ data }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
