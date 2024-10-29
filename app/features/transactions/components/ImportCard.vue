<script setup lang="ts">
import ImportTable from "~/features/transactions/components/import-table.vue";
import type { CreateTransaction } from "~/validations/transaction.validation";

const requiredOptions = ["amount", "date", "payee"];

export interface SelectedColumnsState {
  [key: string]: string | null;
}

interface Props {
  data: string[][];
}
interface Emits {
  (e: "cancel"): void;
  (e: "submit", payload: Omit<CreateTransaction, "accountId">[]): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const selectedColumns = ref<SelectedColumnsState>({});

const headers = Object.keys(props.data[0]!);
const body = props.data;

const onTableSelectChange = (payload: {
  columnIndex: number;
  value: string | null;
}) => {
  const key = `column_${payload.columnIndex}`;

  if (selectedColumns.value[key] === payload.value)
    selectedColumns.value[key] = null;
  else selectedColumns.value[key] = payload.value;

  if (selectedColumns.value[key] === "skip") delete selectedColumns.value[key]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
};

const progress = computed(() => {
  const values = Object.values(selectedColumns.value).filter(Boolean);
  return values.length;
});

const handleContinue = () => {
  const getColumnIndex = (column: string) => {
    return +column.split("_")[1]!;
  };

  const mappedData = {
    headers: headers.map((_header, index) => {
      const columnIndex = getColumnIndex(`column_${index}`);

      return selectedColumns.value[`column_${columnIndex}`] || null;
    }),
    body: body
      .map((row) => {
        const transformedRow = Object.values(row).map((cell, index) => {
          const columnIndex = getColumnIndex(`column_${index}`);
          return selectedColumns.value[`column_${columnIndex}`] ? cell : null;
        });

        return transformedRow.every((item) => item === null)
          ? []
          : transformedRow;
      })
      .filter((row) => row.length > 0),
  };

  const arrayOfData = mappedData.body.map((row) =>
    row.reduce(
      (acc, cell, index) => {
        const header = mappedData.headers[index];
        if (header) acc[header] = cell;
        return acc;
      },
      {} as Record<string, any>,
    ),
  );

  const formattedData: Omit<CreateTransaction, "accountId">[] = arrayOfData.map(
    (item) => {
      return {
        amount: +item.amount,
        date: new Date(item.date).toISOString(),
        payee: item.payee,
      };
    },
  );

  emits("submit", formattedData);
};
</script>

<template>
  <Card class="border-none drop-shadow-none">
    <CardHeader
      v-once
      class="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between"
    >
      <CardTitle class="line-clamp-1 text-xl">Import Transaction</CardTitle>

      <div class="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
        <Button size="sm" class="w-full lg:w-auto" @click="emits('cancel')">
          Cancel
        </Button>
        <Button
          size="sm"
          :disabled="progress < requiredOptions.length"
          class="w-full lg:w-auto"
          @click="handleContinue"
        >
          Continue ({{ progress }} / {{ requiredOptions.length }})
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <ImportTable
        :headers="headers!"
        :body="body"
        :selected-columns="selectedColumns"
        @table-header-select-change="onTableSelectChange"
      />
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped></style>
