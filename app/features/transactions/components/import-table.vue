<script setup lang="ts">
import TableHeadSelect from "~/features/transactions/components/TableHeadSelect.vue";

interface Props {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
}

interface Emits {
  (
    e: "table-header-select-change",
    payload: { columnIndex: number; value: string | null },
  ): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const onTableHeaderSelectChange = (payload: {
  columnIndex: number;
  value: string | null;
}) => {
  emits("table-header-select-change", payload);
};
</script>

<template>
  <div class="overflow-hidden rounded-md border">
    <Table>
      <TableHeader class="bg-muted">
        <TableRow>
          <TableHead v-for="(_, i) in headers" :key="i">
            <TableHeadSelect
              :column-index="i"
              :selected-columns="selectedColumns"
              @change="onTableHeaderSelectChange"
            />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="(row, i) in body" :key="i">
          <TableCell v-for="(cell, j) in row" :key="j">{{ cell }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style lang="scss" scoped></style>
