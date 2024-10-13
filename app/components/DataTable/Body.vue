<script setup lang="ts">
import { FlexRender, type ColumnDef, type Row } from "@tanstack/vue-table";

interface Props {
  columns: ColumnDef<any, any>[];
  rows: Row<any>[];
}

defineProps<Props>();
</script>

<template>
  <TableBody>
    <template v-if="rows?.length">
      <TableRow
        v-for="row in rows"
        :key="row.id"
        :data-state="row.getIsSelected() && 'selected'"
      >
        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
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
</template>

<style lang="scss" scoped></style>
