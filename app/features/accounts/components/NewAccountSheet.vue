<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { useCreateAccount } from "~/features/accounts/api/use-create-account";
import AccountForm from "~/features/accounts/components/AccountForm.vue";
import { useNewAccount } from "~/features/accounts/hooks/use-new-account";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { CreateAccount } from "~/validations/account.validation";

const { isOpen, onClose } = useNewAccount();
const { executeCreate, status, error } = useCreateAccount();

const onSubmit = async (value: CreateAccount) => {
  await executeCreate(value);

  // handle error
  if (error.value) {
    const { description, title } = handleApiError(error.value);
    toast({ description, title, variant: "destructive" });
    return;
  }

  // success
  toast({ title: "Success", description: "Account created successfully" });
  refreshNuxtData("accounts");
  refreshNuxtData("accounts-pagination");
  onClose();
};
</script>

<template>
  <Sheet :open="isOpen" @update:open="onClose">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>New Account</SheetTitle>
        <SheetDescription
          >Create a new account to track your transactions.</SheetDescription
        >
      </SheetHeader>

      <AccountForm
        :ís-submitting="status === 'pending'"
        @on-submit="onSubmit"
      />
    </SheetContent>
  </Sheet>
</template>

<style lang="scss" scoped></style>
