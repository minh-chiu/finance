import { categoryApi } from "~/apis/1-category.api";
import type { UpdateCategory } from "~/validations/category.validation";

export const useEditCategory = () => {
  const input = ref<UpdateCategory>();
  const id = ref<string>("");

  const { error, execute, status } = useAsyncData(
    () => categoryApi.updateById(id.value, input.value!),
    {
      server: false,
      immediate: false,
    },
  );

  const executeEdit = async (
    categoryId: string,
    accountInput: UpdateCategory,
  ) => {
    id.value = categoryId;
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
