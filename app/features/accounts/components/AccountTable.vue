<script setup lang="ts">
import {
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/vue-table";
import AccountToolbar from "~/features/accounts/components/AccountToolbar.vue";
import { valueUpdater } from "~/lib/utils";
import type { AccountFilter } from "~/pages/accounts/index.vue";
import type { PaginationInfo } from "~/types/paginate-response.type";
import { applyQueryToURL } from "~/utils/helpers/query.helper";
import {
  convertSortingToUrl,
  parseSortingUrl,
} from "~/utils/helpers/sorting.helper";
import type { Account } from "~/validations/account.validation";

interface Props {
  columns: ColumnDef<Account, any>[];
  initialState: {
    _sort?: string;
    _limit?: number;
    _page?: number;
  };
  filter: AccountFilter;
  data: Account[];
  paginationInfo: PaginationInfo;
}

interface Emits {
  (e: "filter-change", filter: AccountFilter): void;
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

const onFilterChange = (value: AccountFilter) => emit("filter-change", value);
const onPageChange = (value?: Pick<PaginationInfo, "_page" | "_limit">) =>
  emit("page-change", value);
</script>

<template>
  <div class="space-y-4">
    <AccountToolbar
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
