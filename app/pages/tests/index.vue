<script setup lang="ts">
import type { NuxtApp } from "#app";
import { categoryApi } from "~/apis/1-category.api";

const { data } = useAsyncData("c-123123", () => categoryApi.getAll(), {
  server: false,
  getCachedData: (key: string, nuxtApp: NuxtApp) => {
    return nuxtApp.payload.data[key];
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
