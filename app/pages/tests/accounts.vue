<script setup lang="ts">
import { useQueryAccountsPaginate } from "~/pages/tests/hooks/use-query-accounts-paginate";

const { accounts, isLoading } = useQueryAccountsPaginate();
</script>

<template>
  <div>
    <Button @click="navigateTo('/tests/transactions')">Transactions</Button>
    <Button @click="navigateTo('/tests/accounts')">Accounts</Button>
    <Button @click="navigateTo('/tests/')">Categories</Button>
    <Button @click="navigateTo('/tests/users')">Users</Button>

    <div v-if="isLoading">Loading...</div>

    <div>{{ accounts }}</div>

    <hr >
    <TetsAccountPagination />
  </div>
</template>

<style lang="scss" scoped></style>
