<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import type { Account } from "~/validations/account.validation";

interface Props {
  row: Row<Account>;
}
defineProps<Props>();
const onDelete = () => {
  // console.log(props.row);
  // TODO: implement
};
</script>

<template>
  <div>
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
        <DropdownMenuItem>Edit</DropdownMenuItem>

        <DropdownMenuItem @click="onDelete">
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
