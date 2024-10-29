<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { toast } from "~/components/ui/toast";
import { useBulkDeleteTransactions } from "~/features/transactions/api/use-bulk-delete-transactions";
import type { TransactionFilter } from "~/pages/transactions/index.vue";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { TransactionPagination } from "~/validations/transaction.validation";

interface Props {
  table: Table<TransactionPagination>;
  filter: TransactionFilter;
}
interface Emits {
  (e: "filter-change", value: TransactionFilter): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const onFilterChange = (value: TransactionFilter) =>
  emit("filter-change", value);

// search change
const onSearchChange = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement;
  onFilterChange({ ...props.filter, payee: target.value });
}, 1000);

// get ids to delete
const idsToDelete = computed(() => {
  const rows = props.table.getSelectedRowModel().rows;
  const ids = rows.map((row) => row.original._id!);

  return ids;
});

const { status, executeBulkDelete, error } = useBulkDeleteTransactions();
const { confirm, setLoading } = useConfirm();

watch(status, () => setLoading(status.value));
const onDeleteMany = async () => {
  const ok = await confirm(
    "Are you sure you want to delete selected transactions?",
    `Delete ${idsToDelete.value.length} transactions`,
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
    title: "Delete Transactions Success",
    description: "Transactions deleted successfully",
  });
  props.table.resetRowSelection();
  refreshNuxtData("transactions-pagination");
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        class="h-8 w-[150px] lg:w-[250px]"
        :model-value="filter.payee"
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
