<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { toast } from "~/components/ui/toast";
import { useBulkDeleteCategories } from "~/features/categories/api/use-bulk-delete-categories";
import type { CategoryFilter } from "~/pages/categories/index.vue";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { Category } from "~/validations/category.validation";

interface Props {
  table: Table<Category>;
  filter: CategoryFilter;
}
interface Emits {
  (e: "filter-change", value: CategoryFilter): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const onFilterChange = (value: CategoryFilter) => emit("filter-change", value);

// search change
const onSearchChange = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement;
  onFilterChange({ ...props.filter, name: target.value });
}, 1000);

// get ids to delete
const idsToDelete = computed(() => {
  const rows = props.table.getSelectedRowModel().rows;
  const ids = rows.map((row) => row.original._id!);

  return ids;
});

const { status, executeBulkDelete, error } = useBulkDeleteCategories();
const { confirm, setLoading } = useConfirm();

watch(status, () => setLoading(status.value));
const onDeleteMany = async () => {
  const ok = await confirm(
    "Are you sure you want to delete selected tasks?",
    "Delete",
  );
  if (!ok) return;

  await executeBulkDelete(idsToDelete.value);

  // handle error
  if (error.value) {
    const { title, description } = handleApiError(error.value);
    return toast({ title, description, variant: "destructive" });
  }

  // success
  toast({
    title: "Delete Categorys Success",
    description: "Categorys deleted successfully",
  });
  props.table.resetRowSelection();
  refreshNuxtData("accounts");
  refreshNuxtData("categories-pagination");
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        class="h-8 w-[150px] lg:w-[250px]"
        :model-value="filter.name"
        @input="onSearchChange"
      />
    </div>

    <div class="flex items-center space-x-2">
      <Button
        v-if="idsToDelete?.length"
        variant="outline"
        size="sm"
        class="text-xs font-normal"
        @click="onDeleteMany"
      >
        <Icon name="mdi:trash-outline" class="mr-2 size-4" />

        Delete ({{ idsToDelete?.length }})
      </Button>

      <DataTableViewOptions :columns="table.getAllColumns()" />
    </div>
  </div>
</template>
