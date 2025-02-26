<script setup lang="ts">
import {
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/vue-table";
import TransactionToolbar from "~/features/transactions/components/TransactionToolbar.vue";
import { valueUpdater } from "~/lib/utils";
import type { TransactionFilter } from "~/pages/transactions/index.vue";
import type { PaginationInfo } from "~/types/paginate-response.type";
import { applyQueryToURL } from "~/utils/helpers/query.helper";
import {
  convertSortingToUrl,
  parseSortingUrl,
} from "~/utils/helpers/sorting.helper";
import type { TransactionPagination } from "~/validations/transaction.validation";

interface Props {
  columns: ColumnDef<TransactionPagination, any>[];
  initialState: {
    _sort?: string;
    _limit?: number;
    _page?: number;
  };
  filter: TransactionFilter;
  data: TransactionPagination[];
  paginationInfo: PaginationInfo;
}

interface Emits {
  (e: "filter-change", filter: TransactionFilter): void;
  (e: "page-change", payload?: Pick<PaginationInfo, "_page" | "_limit">): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref<RowSelectionState>({});
const sorting = ref<SortingState>(parseSortingUrl(props.initialState._sort));

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, sorting);
    applyQueryToURL({ _sort: convertSortingToUrl(sorting.value) });
  },
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, rowSelection);
  },
  getCoreRowModel: getCoreRowModel(),
  manualFiltering: true,
  manualPagination: true,
  manualSorting: true,
  enableRowSelection: true,
});

const onFilterChange = (value: TransactionFilter) =>
  emit("filter-change", value);
const onPageChange = (value?: Pick<PaginationInfo, "_page" | "_limit">) =>
  emit("page-change", value);
</script>

<template>
  <div class="space-y-4">
    <TransactionToolbar
      :table="table"
      :filter="filter"
      @filter-change="onFilterChange"
    />

    <Table>
      <DataTableHeader :header-groups="table.getHeaderGroups()" />
      <DataTableBody :columns="columns" :rows="table.getRowModel().rows" />
    </Table>

    <DataTablePagination
      v-if="paginationInfo"
      :pagination-info="paginationInfo"
      @change="onPageChange"
    />
  </div>
</template>
