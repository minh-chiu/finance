<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { useBulkDelete } from "~/features/accounts/api/use-bulk-delete";
import type { Account } from "~/validations/account.validation";

interface Props {
  filter: { searchTerm?: string };
}
interface Emits {
  (e: "filterChange", filter: { searchTerm?: string }): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const { rowsSelected } = useQueryPagination<Account>();

const onSearchChange = useDebounceFn((event: Event) => {
  const target = event.target as HTMLInputElement;

  const searchTerm = target.value || undefined;
  emits("filterChange", { ...props.filter, searchTerm });
}, 1000);

const { executeBulkDelete, status } = useBulkDelete();

const onDeleteRowsSelected = async () => {
  await executeBulkDelete(rowsSelected.value.map((row) => row._id));

  // resetRowSelection();
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-x-2">
      <div class="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          class="h-8 w-[150px] lg:w-[250px]"
          :model-value="filter.searchTerm"
          @input="onSearchChange"
        />
      </div>

      <div class="flex items-center space-x-2">
        <Button
          v-if="rowsSelected?.length"
          variant="outline"
          size="sm"
          class="text-xs font-normal"
          :disabled="status === 'pending'"
          @click="onDeleteRowsSelected"
        >
          <Icon name="mdi:trash-outline" class="mr-2 size-4" />

          Delete ({{ rowsSelected?.length }})
        </Button>
      </div>
    </div>
  </div>
</template>
