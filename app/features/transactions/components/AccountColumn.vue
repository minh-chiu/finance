<script setup lang="ts">
import { useOpenAccount } from "~/features/accounts/hooks/use-open-account";

interface Props {
  account?: string;
  accountId: string;
}

const props = defineProps<Props>();
const { onOpen: onOpenAccount } = useOpenAccount();

const onClick = () => onOpenAccount(props.accountId);
</script>

<template>
  <div
    class="flex cursor-pointer items-center hover:underline"
    @click="onClick"
  >
    {{ account }}
  </div>
</template>
