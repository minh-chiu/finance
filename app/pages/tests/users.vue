<script setup lang="ts">
import type { NuxtApp } from "#app";
import { userApi } from "~/apis/pre-built/2-user.api";

const { data } = useAsyncData("u-123123", () => userApi.paginate(), {
  server: false,
  getCachedData: (key: string, nuxtApp: NuxtApp) => {
    // console.log({ key, nuxtApp: nuxtApp.payload.data[key] });
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
