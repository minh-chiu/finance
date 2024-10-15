import { accountApi } from "~/apis/0-account.api";
import type { UpdateAccount } from "~/validations/account.validation";

export const useEditAccount = () => {
  const input = ref<UpdateAccount>();

  const { error, execute, status } = useAsyncData(
    () => accountApi.create(input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeEdit = async (accountInput: UpdateAccount) => {
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
