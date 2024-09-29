<script setup lang="ts">
import { accountApi } from "~/apis/0-account.api";

const limit = ref(10);
const page = ref(1);
// const { data, status } = await useLazyAsyncData(
//   () =>
//     accountApi.paginate({
//       _limit: limit.value,
//       _page: page.value,
//     }),
//   {
//     watch: [page, limit],
//   },
// );

// const { error, data, status, execute } = useFetch("/accounts", {
//   immediate: false,
//   watch: false,
//   method: "GET",
// });

const { data, status, execute } = useAsyncData(
  "/users",
  () => accountApi.getAll(),
  {
    immediate: false,
  },
);

const get = async () => {
  await execute();
};

// useAsyncData("accounts", () => fetch(page.value, limit.value), {
//   watch: [page, limit],
// });
</script>

<template>
  <div>
    Transaction page
    <Input v-model="limit" />
    <Input v-model="page" />
    <Button @click="get">Get</Button>
    <ul>
      <h1>{{ status }}</h1>
      <p>{{ data }}</p>
      <!-- <h1 v-if="status === 'pending'">Loading...</h1> -->
      <!-- <li
        v-if="data?.data.length"
        v-for="account in data.data"
        :key="account._id"
      >
        {{ account.title }}
      </li> -->
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
