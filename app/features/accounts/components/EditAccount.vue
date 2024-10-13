<script setup lang="ts">
import { accountApi } from "~/apis/0-account.api";
import { withLoading } from "~/utils/helpers/error-handler.helper";
import type { UpdateAccount } from "~/validations/account.validation";
import { toast } from "../ui/toast";

const { isOpen, onClose, accountId } = useOpenAccount();

const accountStore = useAccountStore();
const { account, isLoading: accountLoading } = storeToRefs(accountStore);

watch(accountId, () => accountStore.getAccountById(accountId.value));

const initialValues = computed(() => {
  return {
    title: account?.value?.title || "",
  };
});

const isUpdating = ref(false);
const onSubmit = async (values: UpdateAccount) => {
  await withLoading(
    isUpdating,
    () => accountApi.updateById(accountId.value!, values),
    () => {
      toast({
        title: "Update Account Success",
        description: "Account updated successfully",
      });

      onClose();
      refreshNuxtData("accounts-paginate");
    },
  );
};

const isDeleting = ref(false);
const onDelete = async () => {
  await withLoading(
    isDeleting,
    () => accountApi.deleteById(accountId.value!),
    () => {
      toast({
        title: "Delete Account Success",
        description: "Account deleted successfully",
      });

      onClose();
      refreshNuxtData("accounts-paginate");
    },
  );
};
</script>

<template>
  <Sheet :open="isOpen" @update:open="onClose">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>Edit Account</SheetTitle>
        <SheetDescription>Edit an existing account. </SheetDescription>
      </SheetHeader>

      <div
        v-if="accountLoading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <Icon
          name="lucide:loader-circle"
          class="size-4 animate-spin text-muted-foreground"
        />
      </div>

      <AccountForm
        v-else
        :id="accountId"
        :initial-values="initialValues"
        :ís-submitting="isUpdating"
        :is-deleting="isDeleting"
        :disabled="isUpdating || isDeleting"
        @on-submit="onSubmit"
        @on-delete="onDelete"
      />
    </SheetContent>
  </Sheet>
</template>

<style lang="scss" scoped></style>
