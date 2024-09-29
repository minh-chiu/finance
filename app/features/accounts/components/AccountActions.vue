<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { computed } from "vue";
import { taskSchema } from "~/tasks/data/schema";
import type { Account } from "~/validations/account.validation";

interface Props {
  row: Row<Account>;
}
const props = defineProps<Props>();

const account = computed(() => taskSchema.parse(props.row.original));
const onEdit = () => {
  // eslint-disable-next-line no-console
  console.log("edit account", account);
};
const onDelete = () => {
  // eslint-disable-next-line no-console
  console.log("delete account", account);
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon name="mdi:dots-horizontal" class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuItem @click="onEdit">Edit</DropdownMenuItem>
      <DropdownMenuSeparator />

      <DropdownMenuItem @click="onDelete">
        Delete
        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
