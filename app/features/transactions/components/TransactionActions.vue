<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import { toast } from "~/components/ui/toast";
import { useBulkDeleteTransactions } from "~/features/transactions/api/use-bulk-delete-transactions";
import { useOpenTransaction } from "~/features/transactions/hooks/use-open-transaction";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { Transaction } from "~/validations/transaction.validation";

interface Props {
  row: Row<Transaction>;
}
const props = defineProps<Props>();

const { onOpen } = useOpenTransaction();
const { confirm, setLoading } = useConfirm();
const {
  executeBulkDelete,
  status: deleteStatus,
  error: deleteError,
} = useBulkDeleteTransactions();

watch(deleteStatus, () => setLoading(deleteStatus.value));
const onDelete = async () => {
  const ok = await confirm(
    "Are you sure you want to delete this account?",
    "Delete Transaction: " + props.row.original._id,
  );
  if (!ok) return;

  await executeBulkDelete([props.row.original._id]);

  if (deleteError.value) {
    const { title, description } = handleApiError(deleteError.value);
    toast({ title, description, variant: "destructive" });
  } else {
    toast({
      title: "Success",
      description: "Transaction deleted successfully",
    });
    refreshNuxtData("transactions-pagination");
  }
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
          <Icon name="mdi:dots-horizontal" class="size-4" />

          <span class="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" class="w-[160px]">
        <DropdownMenuItem @click="onOpen(row.original._id)">
          <Icon name="la:edit" class="mr-2 size-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem @click="onDelete">
          <Icon name="la:trash" class="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
