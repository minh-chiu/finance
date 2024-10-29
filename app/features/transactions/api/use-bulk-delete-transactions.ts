import { transactionApi } from "~/apis/0-transaction.api";

export const useBulkDeleteTransactions = () => {
  const ids = ref<string[]>([]);

  const { error, execute, status } = useAsyncData(
    () => transactionApi.deleteManyByIds(ids.value),
    { server: false, immediate: false },
  );

  const executeBulkDelete = async (_ids: string[]) => {
    ids.value = _ids;

    // execute
    await execute();
  };

  return {
    executeBulkDelete,
    status,
    error,
  };
};
