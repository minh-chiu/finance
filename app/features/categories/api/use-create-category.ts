import { categoryApi } from "~/apis/1-category.api";
import type { CreateCategory } from "~/validations/category.validation";

export const useCreateCategory = () => {
  const input = ref<CreateCategory>();

  const { error, execute, status } = useAsyncData(
    () => categoryApi.create(input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeCreate = async (accountInput: CreateCategory) => {
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
