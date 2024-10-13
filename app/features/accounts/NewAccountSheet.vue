<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { useNewAccountSheet } from "~/composables/useNewAccountSheet";
import { useCreateTask } from "~/features/accounts/api/use-create-account";
import AccountForm from "~/features/accounts/components/AccountForm.vue";
import { handleError } from "~/utils/helpers/error-handler.helper";
import type { CreateTask } from "~/validations/task.validation";

const { executeCreateTask, error } = useCreateTask();
const { isOpen, onClose } = useNewAccountSheet();

const isLoading = ref(false);
const onSubmit = async (value: CreateTask) => {
  await executeCreateTask(value);

  if (error.value) {
    const { description, title } = handleError(error.value);
    toast({ description, title, variant: "destructive" });
  } else {
    toast({
      description: "Account created successfully",
      title: "Success",
    });
  }
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

      <AccountForm :ís-submitting="isLoading" @on-submit="onSubmit" />
    </SheetContent>
  </Sheet>
</template>

<style lang="scss" scoped></style>
