<script setup lang="ts">
import {
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/vue-table";
import AccountToolbar from "~/features/accounts/components/DataTable/AccountToolbar.vue";
import { valueUpdater } from "~/lib/utils";
import type { Filter } from "~/pages/tasks/index.vue";
import type { Priority, Status, Task } from "~/types/0-task";
import type { PageInfo } from "~/types/paginate-response.type";
import { applyQueryToURL } from "~/utils/helpers/query.helper";
import {
  convertSortingToUrl,
  parseSortingUrl,
} from "~/utils/helpers/sorting.helper";

interface Props {
  columns: ColumnDef<Task, any>[];
  initialState: {
    _sort?: string;
    _limit?: number;
    _page?: number;
  };
  filter: Filter;
  statuses: Status[];
  priorities: Priority[];
  data: Task[];
  pageInfo: PageInfo;
}

type Emits = {
  "page-change": [page?: number];
  "limit-change": [limit?: number];
  "filter-change": [value: Filter];
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
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

const onPageChange = (page?: number) => emits("page-change", page);
const onLimitChange = (limit?: number) => emits("limit-change", limit);
const onFilterChange = (value: Filter) => emits("filter-change", value);
</script>

<template>
  <div class="space-y-4">
    <AccountToolbar
      :table="table"
      :statuses="statuses"
      :priorities="priorities"
      :filter="filter"
      @filter-change="onFilterChange"
    />

    <Table>
      <DataTableHeader :header-groups="table.getHeaderGroups()" />
      <DataTableBody :columns="columns" :rows="table.getRowModel().rows" />
    </Table>

    <DataTablePagination
      v-if="pageInfo"
      :page-info="pageInfo"
      @page-change="onPageChange"
      @limit-change="onLimitChange"
    />
  </div>
</template>
