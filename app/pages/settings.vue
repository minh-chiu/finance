<script setup lang="ts">
import { useAccountsPagination } from "~/features/accounts/api/use-accounts-pagination";

const { accounts, fetch } = useAccountsPagination();

const limit = ref(10);
const page = ref(1);
callOnce(async () => {
  await useAsyncData(() => fetch(page.value, limit.value), {
    watch: [page, limit],
  });
});
</script>

<template>
  <div>
    Transaction page
    <Input v-model="limit" />
    <Input v-model="page" />
    <ul>
      <li v-for="account in accounts" :key="account._id">
        {{ account.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
