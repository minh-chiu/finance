<script setup lang="ts">
import EditAccountSheet from "~/features/accounts/components/EditAccountSheet.vue";
import NewAccountSheet from "~/features/accounts/components/NewAccountSheet.vue";
import { useOpenAccount } from "~/features/accounts/hooks/use-open-account";
import EditCategorySheet from "~/features/categories/components/EditCategorySheet.vue";
import NewCategorySheet from "~/features/categories/components/NewCategorySheet.vue";
import { useOpenCategory } from "~/features/categories/hooks/use-open-category";

const { accountId } = useOpenAccount();
const { categoryId } = useOpenCategory();

const isMounted = ref(false);

onMounted(() => (isMounted.value = true));
</script>

<template>
  <template v-if="isMounted">
    <ConfirmDialog />
    <NewAccountSheet />
    <EditAccountSheet v-if="accountId" />

    <NewCategorySheet />
    <EditCategorySheet v-if="categoryId" />
  </template>
</template>
