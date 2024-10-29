<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { useCreateCategory } from "~/features/categories/api/use-create-category";
import CategoryForm from "~/features/categories/components/CategoryForm.vue";
import { useNewCategory } from "~/features/categories/hooks/use-new-category";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { CreateCategory } from "~/validations/category.validation";

const { isOpen, onClose } = useNewCategory();
const { executeCreate, status, error } = useCreateCategory();

const onSubmit = async (value: CreateCategory) => {
  await executeCreate(value);

  // handle error
  if (error.value) {
    const { description, title } = handleApiError(error.value);
    toast({ description, title, variant: "destructive" });
    return;
  }

  // success
  toast({ title: "Success", description: "Category created successfully" });
  refreshNuxtData("categories");
  refreshNuxtData("categories-pagination");
  onClose();
};
</script>

<template>
  <Sheet :open="isOpen" @update:open="onClose">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>New Category</SheetTitle>
        <SheetDescription
          >Create a new category to track your transactions.</SheetDescription
        >
      </SheetHeader>

      <CategoryForm
        :ís-submitting="status === 'pending'"
        @on-submit="onSubmit"
      />
    </SheetContent>
  </Sheet>
</template>

<style lang="scss" scoped></style>
