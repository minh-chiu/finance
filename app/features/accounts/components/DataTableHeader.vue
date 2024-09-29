<script setup lang="ts">
import { FlexRender, type Table } from "@tanstack/vue-table";
import type { Task } from "~/features/tasks/data/schema";

interface DataTableToolbarProps {
  table: Table<Task>;
}
defineProps<DataTableToolbarProps>();
</script>

<template>
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
        />
      </TableHead>
    </TableRow>
  </TableHeader>
</template>

<style lang="scss" scoped></style>
