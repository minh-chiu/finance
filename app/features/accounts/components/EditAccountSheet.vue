<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { useBulkDeleteAccounts } from "~/features/accounts/api/use-bulk-delete-accounts";
import { useEditAccount } from "~/features/accounts/api/use-edit-account";
import { useGetAccount } from "~/features/accounts/api/use-get-account";
import AccountForm from "~/features/accounts/components/AccountForm.vue";
import { useOpenAccount } from "~/features/accounts/hooks/use-open-account";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { UpdateAccount } from "~/validations/account.validation";

const { isOpen, onClose, accountId } = useOpenAccount();
const { confirm, setLoading } = useConfirm();

const { data: accountQuery, status } = await useGetAccount(accountId.value!);
const { executeEdit, status: editStatus, error: editError } = useEditAccount();
const {
  executeBulkDelete,
  status: deleteStatus,
  error: deleteError,
} = useBulkDeleteAccounts();

const initialValues = computed(() => {
  return {
    title: accountQuery?.value?.title || "",
  };
});

const onSubmit = async (values: UpdateAccount) => {
  await executeEdit(accountId.value!, values);

  if (editError.value) {
    const { title, description } = handleApiError(editError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({ title: "Success", description: "Account updated successfully" });
    refreshNuxtData("accounts-pagination");
    onClose();
  }
};

watch(deleteStatus, () => setLoading(deleteStatus.value));
const onDelete = async () => {
  const ok = await confirm(
    "Are you sure you want to delete this account?",
    "Delete Account: " + accountQuery?.value?.title,
  );
  if (!ok) return;

  await executeBulkDelete([accountId.value!]);

  if (deleteError.value) {
    const { title, description } = handleApiError(deleteError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({ title: "Success", description: "Account deleted successfully" });
    onClose();
    refreshNuxtData("accounts");
  }
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
        v-if="status === 'pending'"
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
        :ís-submitting="editStatus === 'pending'"
        :is-deleting="deleteStatus === 'pending'"
        :disabled="editStatus === 'pending' || deleteStatus === 'pending'"
        @on-submit="onSubmit"
        @on-delete="onDelete"
      />
    </SheetContent>
  </Sheet>
</template>

<style lang="scss" scoped></style>
