<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { accountApi } from "~/apis/0-account.api";
import { withLoading } from "~/utils/helpers/error-handler.helper";
import type { Account } from "~/validations/account.validation";

interface Props {
  row: Row<Account>;
}
const props = defineProps<Props>();

const { onOpen } = useOpenAccount();
const { resetRowSelection } = usePagination<Account>();

const { confirm } = useConfirm();
const isDeleting = ref(false);

const onDelete = async () => {
  const ok = await confirm();
  if (!ok) return;

  await withLoading(
    isDeleting,
    () => accountApi.deleteById(props.row.original._id),
    () => {
      resetRowSelection();
      refreshNuxtData("accounts-paginate");
    },
  );
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
        <DropdownMenuItem @click="() => onOpen(row.original._id)"
          >Edit</DropdownMenuItem
        >

        <DropdownMenuItem @click="onDelete">
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
