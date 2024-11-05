<script setup lang="ts">
/* eslint-disable */
import PlaidLink from "vue-plaid-link2";
import { useCreateLinkToken } from "~/features/settings/api/use-create-link-token";

const { data, status, mutate } = useCreateLinkToken();
const token = computed(() => data.value?.link_token);

onMounted(() => {
  mutate(undefined);
});

const connect = () => {
  // const plaid = usePlaidLink({
  //   token,
  // });
  // plaid.open();
};

const onSuccess = (data: any) => {
  console.log({ data });
};
</script>

<template>
  <PlaidLink :token="token" :onSuccess="onSuccess" env="sandbox">
    <button>Open Link Slot</button>
  </PlaidLink>

  <Button
    size="sm"
    variant="ghost"
    :disabed="status === 'pending'"
    @click="connect"
  >
    <Icon
      v-if="status === 'pending'"
      name="lucide:loader"
      class="mr-2 h-4 w-4 animate-spin"
    />

    Connect
  </Button>
</template>
