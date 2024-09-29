import { accountApi } from "~/apis/0-account.api";
import { toast } from "~/components/ui/toast";
import { handleError } from "~/utils/helpers/error-handler.helper";

export const useBulkDelete = () => {
  const ids = ref<string[]>([]);

  const { error, execute, status } = useAsyncData(
    () => accountApi.deleteManyByIds(ids.value),
    { immediate: false },
  );

  const executeBulkDelete = async (_ids: string[]) => {
    // set ids
    ids.value = _ids.map((i) => `${i}i`);

    // execute
    await execute();

    // handle success
    if (!error.value) return refreshNuxtData("accounts-paginate");

    // handle error
    const { title, description } = handleError(error.value);
    toast({ title, description, variant: "destructive" });
  };

  return {
    executeBulkDelete,
    status,
  };
};
