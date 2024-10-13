import { accountApi } from "~/apis/0-account.api";
import type { CreateAccount } from "~/validations/account.validation";

export const useCreateAccount = () => {
  const input = ref<CreateAccount>();

  const { error, execute, status } = useAsyncData(
    () => accountApi.create(input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeCreate = async (taskInput: CreateAccount) => {
    input.value = taskInput;

    // execute
    await execute();
  };

  return {
    executeCreate,
    status,
    error,
  };
};
