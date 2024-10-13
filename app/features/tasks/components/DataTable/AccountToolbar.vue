<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { toast } from "~/components/ui/toast";
import { useNewAccountSheet } from "~/composables/useNewAccountSheet";
import { useBulkDeleteAccounts } from "~/features/accounts/api/use-bulk-delete-accounts";
import type { Filter } from "~/pages/tasks/index.vue";
import type { Option, Priority, Status, Task } from "~/types/0-task";
import { handleApiError } from "~/utils/helpers/error-handler.helper";

interface Props {
  table: Table<Task>;
  filter: Filter;
  statuses: Status[];
  priorities: Priority[];
}

interface Emits {
  (e: "filter-change", value: Filter): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { status, executeBulkDelete, error } = useBulkDeleteAccounts();
const { onOpen } = useNewAccountSheet();

const { setDialog, confirm, setLoading } = useConfirm();
watch(status, () => setLoading(status.value));

const onFilterChange = (value: Filter) => {
  emit("filter-change", value);
};

// search change
const onSearchChange = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement;
  onFilterChange({ ...props.filter, searchTerm: target.value });
}, 1000);

// status change
const onSelectStatuses = (optionsSelected?: Option[]) => {
  const selected = props.statuses?.filter((status) =>
    optionsSelected?.some((option) => option.value === status.value),
  );

  onFilterChange({ ...props.filter, statuses: selected });
};

// priority change
const onSelectPriorities = (optionsSelected?: Option[]) => {
  const selected = props.priorities?.filter((status) =>
    optionsSelected?.some((option) => option.value === status.value),
  );

  onFilterChange({ ...props.filter, priorities: selected });
};

const onDeleteMany = async () => {
  setDialog("Are you sure you want to delete selected tasks?", "Delete");
  const ok = await confirm();
  if (!ok) return;

  const rows = props.table.getSelectedRowModel().rows;
  const ids = rows.map((row) => row.original._id!);

  await executeBulkDelete(ids);

  // handle error
  if (error.value) {
    const { title, description } = handleApiError(error.value);
    return toast({ title, description, variant: "destructive" });
  }

  // success
  toast({
    title: "Delete Accounts Success",
    description: "Accounts deleted successfully",
  });
  props.table.resetRowSelection();
  refreshNuxtData("accounts-paginate");
};

const onExport = () => {
  // console.log({ export: "export" });
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter tasks..."
        class="h-8 w-[150px] lg:w-[250px]"
        :model-value="filter.searchTerm"
        @input="onSearchChange"
      />

      <DataTableFacetedFilter
        v-if="statuses.length"
        title="Status"
        :options="statuses"
        :options-selected="filter.statuses"
        @on-options-selected="onSelectStatuses"
      />

      <DataTableFacetedFilter
        v-if="priorities.length"
        title="Priority"
        :options="priorities"
        :options-selected="filter.priorities"
        @on-options-selected="onSelectPriorities"
      />
    </div>

    <div class="flex items-center space-x-2">
      <Button
        v-if="table.getIsSomeRowsSelected()"
        variant="destructive"
        @click="onDeleteMany"
        >Delete</Button
      >
      <Button variant="secondary" @click="onExport">Export</Button>
      <Button @click="onOpen">Create</Button>

      <DataTableViewOptions :columns="table.getAllColumns()" />
    </div>
  </div>
</template>
