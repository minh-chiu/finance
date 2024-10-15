import { categoryApi } from "~/apis/1-category.api";

export const useBulkDeleteCategories = () => {
  const ids = ref<string[]>([]);

  const { error, execute, status } = useAsyncData(
    () => categoryApi.deleteManyByIds(ids.value),
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
