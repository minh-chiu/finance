<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { useCreateAccount } from "~/features/accounts/api/use-create-account";
import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "~/features/categories/api/use-create-category";
import { useGetCategories } from "~/features/categories/api/use-get-categories";
import { useCreateTransaction } from "~/features/transactions/api/use-create-transaction";
import TransactionForm from "~/features/transactions/components/TransactionForm.vue";
import { useNewTransaction } from "~/features/transactions/hooks/use-new-transaction";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { CreateTransaction } from "~/validations/transaction.validation";

const { isOpen, onClose } = useNewTransaction();
const { executeCreate, status, error } = useCreateTransaction();

const categoryQuery = useGetCategories();
const {
  // executeCreate: executeCreateCategory,
  status: categoryStatus,
  // error: categoryError,
} = useCreateCategory();

const categoryOptions = computed(() => {
  return (categoryQuery.data.value || []).map((category) => ({
    label: category.name,
    value: category._id,
  }));
});

const accountQuery = useGetAccounts();
const {
  // executeCreate: executeCreateAccount,
  status: accountStatus,
  // error: accountError,
} = useCreateAccount();

const accountOptions = computed(() => {
  return (accountQuery.data.value || []).map((account) => ({
    label: account.title,
    value: account._id,
  }));
});

const isLoading = computed(() => {
  return (
    accountQuery.status.value === "pending" ||
    categoryQuery.status.value === "pending"
  );
});

const isCreating = computed(() => {
  return (
    accountStatus.value === "pending" ||
    categoryStatus.value === "pending" ||
    status.value === "pending"
  );
});

// const onCreateAccount = async (value: CreateAccount) => {
//   await executeCreateAccount(value);

//   // handle error
//   if (accountError.value) {
//     const { description, title } = handleApiError(accountError.value);
//     toast({ description, title, variant: "destructive" });
//   }

//   // success
//   toast({ title: "Success", description: "Account created successfully" });
//   refreshNuxtData("accounts");
// };

// const onCreateCategory = async (value: CreateCategory) => {
//   await executeCreateCategory(value);

//   // handle error
//   if (categoryError.value) {
//     const { description, title } = handleApiError(categoryError.value);
//     toast({ description, title, variant: "destructive" });
//   }

//   // success
//   toast({ title: "Success", description: "Category created successfully" });
//   refreshNuxtData("categories");
// };

const onSubmit = async (value: CreateTransaction) => {
  await executeCreate(value);

  // handle error
  if (error.value) {
    const { description, title } = handleApiError(error.value);
    toast({ description, title, variant: "destructive" });
    return;
  }

  // success
  toast({ title: "Success", description: "Transaction created successfully" });
  refreshNuxtData("transactions-pagination");
  onClose();
};
</script>

<template>
  <Sheet :open="isOpen" @update:open="onClose">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>New Transaction</SheetTitle>
        <SheetDescription
          >Create a new transaction to track your
          transactions.</SheetDescription
        >
      </SheetHeader>

      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <Icon
          name="ri:loader-4-fill"
          class="size-4 animate-spin text-muted-foreground"
        />
      </div>

      <TransactionForm
        v-else
        :ís-submitting="isCreating"
        :category-options="categoryOptions"
        :account-options="accountOptions"
        @on-submit="onSubmit"
      />
      <!-- @create-category="onCreateCategory"
        @create-account="onCreateAccount" -->
    </SheetContent>
  </Sheet>
</template>

<style lang="scss" scoped></style>
