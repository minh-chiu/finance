import { transactionApi } from "~/apis/0-transaction.api";
import type { CreateTransaction } from "~/validations/transaction.validation";

export const useCreateTransaction = () => {
  const input = ref<CreateTransaction>();

  const { error, execute, status } = useAsyncData(
    () => transactionApi.create(input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeCreate = async (accountInput: CreateTransaction) => {
    input.value = accountInput;

    // execute
    await execute();
  };

  return {
    executeCreate,
    status,
    error,
  };
};
