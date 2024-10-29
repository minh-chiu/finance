import { transactionApi } from "~/apis/0-transaction.api";
import type { UpdateTransaction } from "~/validations/transaction.validation";

export const useEditTransaction = () => {
  const input = ref<UpdateTransaction>();
  const id = ref<string>("");

  const { error, execute, status } = useAsyncData(
    () => transactionApi.updateById(id.value, input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeEdit = async (
    idInput: string,
    accountInput: UpdateTransaction,
  ) => {
    id.value = idInput;
    input.value = accountInput;

    // execute
    await execute();
  };

  return {
    executeEdit,
    status,
    error,
  };
};
