import { categoryApi } from "~/apis/1-category.api";
import type { UpdateCategory } from "~/validations/category.validation";

export const useEditCategory = () => {
  const input = ref<UpdateCategory>();

  const { error, execute, status } = useAsyncData(
    () => categoryApi.create(input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeEdit = async (accountInput: UpdateCategory) => {
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
