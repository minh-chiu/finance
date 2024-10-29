<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";
import { useGetCategories } from "~/features/categories/api/use-get-categories";
import { useBulkDeleteTransactions } from "~/features/transactions/api/use-bulk-delete-transactions";
import { useEditTransaction } from "~/features/transactions/api/use-edit-transaction";
import { useGetTransaction } from "~/features/transactions/api/use-get-transaction";
import TransactionForm from "~/features/transactions/components/TransactionForm.vue";
import { useOpenTransaction } from "~/features/transactions/hooks/use-open-transaction";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type {
  CreateTransaction,
  UpdateTransaction,
} from "~/validations/transaction.validation";

const { isOpen, onClose, transactionId } = useOpenTransaction();
const { confirm, setLoading } = useConfirm();

const { data: transactionQuery, status } = await useGetTransaction(
  transactionId.value!,
);
const {
  executeEdit,
  status: editStatus,
  error: editError,
} = useEditTransaction();
const {
  executeBulkDelete,
  status: deleteStatus,
  error: deleteError,
} = useBulkDeleteTransactions();

const categoryQuery = useGetCategories();
const categoryOptions = computed(() => {
  return (categoryQuery.data.value || []).map((category) => ({
    label: category.name,
    value: category._id,
  }));
});

const accountQuery = useGetAccounts();
const accountOptions = computed(() => {
  return (accountQuery.data.value || []).map((account) => ({
    label: account.title,
    value: account._id,
  }));
});

const isLoading = computed(() => {
  return (
    accountQuery.status.value === "pending" ||
    categoryQuery.status.value === "pending" ||
    status.value == "pending"
  );
});
function parseDateWithoutTime(isoString: string) {
  return isoString.split("T")[0];
}

const initialValues = computed<UpdateTransaction>(() => {
  return {
    ...transactionQuery?.value,
    amount: Number(transactionQuery?.value?.amount) || 0,
    date: parseDateWithoutTime(transactionQuery!.value!.date),
  };
});

const onSubmit = async (values: CreateTransaction) => {
  await executeEdit(transactionId.value!, values);

  if (editError.value) {
    const { title, description } = handleApiError(editError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({
      title: "Success",
      description: "Transaction updated successfully",
    });
    refreshNuxtData("transactions-pagination");
    onClose();
  }
};

watch(deleteStatus, () => setLoading(deleteStatus.value));
const onDelete = async () => {
  const ok = await confirm(
    "Are you sure you want to delete this transaction?",
    "Delete Transaction: " + transactionQuery?.value?._id,
  );
  if (!ok) return;

  await executeBulkDelete([transactionId.value!]);

  if (deleteError.value) {
    const { title, description } = handleApiError(deleteError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({
      title: "Success",
      description: "Transaction deleted successfully",
    });
    refreshNuxtData("transactions-pagination");
    onClose();
  }
};
</script>

<template>
  <Sheet :open="isOpen" @update:open="onClose">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>Edit Transaction</SheetTitle>
        <SheetDescription>Edit an existing transaction. </SheetDescription>
      </SheetHeader>

      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <Icon
          name="lucide:loader-circle"
          class="size-4 animate-spin text-muted-foreground"
        />
      </div>

      <TransactionForm
        v-else
        :id="transactionId"
        :initial-values="initialValues"
        :ís-submitting="editStatus === 'pending'"
        :is-deleting="deleteStatus === 'pending'"
        :disabled="editStatus === 'pending' || deleteStatus === 'pending'"
        :category-options="categoryOptions"
        :account-options="accountOptions"
        @on-submit="onSubmit"
        @on-delete="onDelete"
      />
    </SheetContent>
  </Sheet>
</template>

<style lang="scss" scoped></style>
