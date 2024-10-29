import { transactionApi } from "~/apis/0-transaction.api";
import type { CreateTransaction } from "~/validations/transaction.validation";

export const useBulkCreateTransaction = () => {
  const inputs = ref<CreateTransaction[]>();

  const { error, execute, status } = useAsyncData(
    () => transactionApi.createMany(inputs.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeCreateMany = async (accountInputs: CreateTransaction[]) => {
    inputs.value = accountInputs;

    // execute
    await execute();
  };

  return {
    executeCreateMany,
    status,
    error,
  };
};
