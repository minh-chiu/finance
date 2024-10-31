<script setup lang="ts">
import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";

const { data, status } = useGetAccounts();

const router = useRouter();
const query = useRoute().query;
const accountId = ref((query.account as string) || "all");

const onChange = (newValue: string) => {
  accountId.value = newValue;

  const queryItem = {
    ...query,
    account: accountId.value,
  };
  if (newValue === "all") {
    queryItem.account = "";
  }

  router.push({ query: queryItem, replace: true });
};
</script>

<template>
  <Select
    :disabled="status === 'pending'"
    :model-value="accountId"
    @update:model-value="onChange"
  >
    <SelectTrigger
      class="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
    >
      <SelectValue placeholder="Account" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="all"> All accounts</SelectItem>
      <SelectItem
        v-for="account in data"
        :key="account._id"
        :value="account.title"
      >
        {{ account.title }}</SelectItem
      >
    </SelectContent>
  </Select>
</template>
