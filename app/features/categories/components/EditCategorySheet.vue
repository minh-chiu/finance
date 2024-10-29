<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { useBulkDeleteCategories } from "~/features/categories/api/use-bulk-delete-categories";
import { useEditCategory } from "~/features/categories/api/use-edit-category";
import { useGetCategory } from "~/features/categories/api/use-get-category";
import CategoryForm from "~/features/categories/components/CategoryForm.vue";
import { useOpenCategory } from "~/features/categories/hooks/use-open-category";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { UpdateCategory } from "~/validations/category.validation";

const { isOpen, onClose, categoryId } = useOpenCategory();
const { confirm, setLoading } = useConfirm();

const { data: categoryQuery, status } = await useGetCategory(categoryId.value!);
const { executeEdit, status: editStatus, error: editError } = useEditCategory();
const {
  executeBulkDelete,
  status: deleteStatus,
  error: deleteError,
} = useBulkDeleteCategories();

const initialValues = computed(() => {
  return {
    name: categoryQuery?.value?.name || "",
  };
});

const onSubmit = async (values: UpdateCategory) => {
  await executeEdit(categoryId.value!, values);

  if (editError.value) {
    const { title, description } = handleApiError(editError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({ title: "Success", description: "Category updated successfully" });
    refreshNuxtData("get-categories");
    refreshNuxtData("categories-pagination");
    onClose();
  }
};

watch(deleteStatus, () => setLoading(deleteStatus.value));
const onDelete = async () => {
  const ok = await confirm(
    "Are you sure you want to delete this category?",
    "Delete Category: " + categoryQuery?.value?.name,
  );
  if (!ok) return;

  await executeBulkDelete([categoryId.value!]);

  if (deleteError.value) {
    const { title, description } = handleApiError(deleteError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({ title: "Success", description: "Category deleted successfully" });
    onClose();
    refreshNuxtData("categories");
  }
};
</script>

<template>
  <Sheet :open="isOpen" @update:open="onClose">
    <SheetContent class="space-y-4">
      <SheetHeader>
        <SheetTitle>Edit Category</SheetTitle>
        <SheetDescription>Edit an existing category. </SheetDescription>
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

      <CategoryForm
        v-else
        :id="categoryId"
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
