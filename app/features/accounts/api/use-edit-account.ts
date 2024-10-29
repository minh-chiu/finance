import { accountApi } from "~/apis/0-account.api";
import type { UpdateAccount } from "~/validations/account.validation";

export const useEditAccount = () => {
  const input = ref<UpdateAccount>();
  const id = ref<string>("");

  const { error, execute, status } = useAsyncData(
    () => accountApi.updateById(id.value, input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeEdit = async (
    accountId: string,
    accountInput: UpdateAccount,
  ) => {
    id.value = accountId;
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
