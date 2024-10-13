<script setup lang="ts">
import { FlexRender, type HeaderGroup } from "@tanstack/vue-table";

interface Props {
  headerGroups: HeaderGroup<any>[];
}

defineProps<Props>();
</script>

<template>
  <TableHeader>
    <TableRow v-for="headerGroup in headerGroups" :key="headerGroup.id">
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
