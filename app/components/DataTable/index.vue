<script setup lang="ts">
import type {
  ColumnDef,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";

import { ref } from "vue";

import type { AsyncDataRequestStatus } from "#app";
import { valueUpdater } from "~/lib/utils";

interface Props {
  columns: ColumnDef<any>[];
  data?: any[];
  status?: AsyncDataRequestStatus;
}

const props = defineProps<Props>();
const paginationStore = useQueryPagination();

const sorting = ref<SortingState>(paginationStore.sortingState.value);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref<RowSelectionState>({});
const table = useVueTable({
  get data() {
    return props.data || [];
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
    paginationStore.handleSortingChange(sorting.value);
  },

  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),

  onRowSelectionChange: (updaterOrValue) => {
    valueUpdater(updaterOrValue, rowSelection);
    paginationStore.handleRowSelectionChange();
  },
  getCoreRowModel: getCoreRowModel(),
  manualFiltering: true,
  manualPagination: true,
  manualSorting: true,
  enableRowSelection: true,
});

paginationStore.setTable(table);
</script>

<template>
  <div>
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
              class="my-1"
            />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="status == 'pending' && table.getRowModel().rows">
          <TableRow v-for="i in 20" :key="i">
            <TableCell v-for="column in columns" :key="column.id">
              <Skeleton class="h-6 w-full" />
            </TableCell>
          </TableRow>
        </template>

        <template v-else-if="table.getRowModel().rows?.length">
          <!-- <template v-if="status == 'pending'">
            <TableRow>
              <TableCell :colspan="columns.length" class="h-4">
                <p class="text-center">Loading...</p>
              </TableCell>
            </TableRow>
          </template> -->

          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
                class="my-1 text-sm"
              />
            </TableCell>
          </TableRow>
        </template>

        <TableRow v-else>
          <TableCell :colspan="columns.length" class="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <div class="hidden lg:block">
      <DataTableViewOptions :table="table" />
    </div>
  </div>
</template>
