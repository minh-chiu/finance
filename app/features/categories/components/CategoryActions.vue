<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { toast } from "~/components/ui/toast";
import { useBulkDeleteCategories } from "~/features/categories/api/use-bulk-delete-categories";
import { useOpenCategory } from "~/features/categories/hooks/use-open-category";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { Category } from "~/validations/category.validation";

interface Props {
  row: Row<Category>;
}
const props = defineProps<Props>();

const { onOpen } = useOpenCategory();
const { confirm, setLoading } = useConfirm();
const {
  executeBulkDelete,
  status: deleteStatus,
  error: deleteError,
} = useBulkDeleteCategories();

watch(deleteStatus, () => setLoading(deleteStatus.value));
const onDelete = async () => {
  const ok = await confirm(
    "Are you sure you want to delete this account?",
    "Delete Category: " + props.row.original.name,
  );
  if (!ok) return;

  await executeBulkDelete([props.row.original._id]);

  if (deleteError.value) {
    const { title, description } = handleApiError(deleteError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({ title: "Success", description: "Category deleted successfully" });
    refreshNuxtData("categories");
    refreshNuxtData("categories-pagination");
  }
};
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="ghost"
          class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Icon name="mdi:dots-horizontal" class="size-4" />

          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" class="w-[160px]">
        <DropdownMenuItem @click="onOpen(row.original._id)">
          <Icon name="la:edit" class="mr-2 size-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem @click="onDelete">
          <Icon name="la:trash" class="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
