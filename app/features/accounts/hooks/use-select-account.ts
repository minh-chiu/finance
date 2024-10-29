import { useGetAccounts } from "~/features/accounts/api/use-get-accounts";

export const useSelectAccount = () => {
  const promise: globalThis.Ref<any> = useState("useSelectAccount", () => null);

  const accountsQuery = useGetAccounts();
  const accountOptions = computed(() => {
    return (accountsQuery.data.value || []).map((account) => ({
      label: account.title,
      value: account._id,
    }));
  });
  const isLoading = computed(() => {
    return accountsQuery.status.value === "pending";
  });

  const confirm = () => {
    return new Promise<string | undefined>((resolve) => {
      promise.value = { resolve };
    });
  };

  const handleClose = () => {
    promise.value = undefined;
  };

  const handleConfirm = (accountId: string) => {
    promise.value?.resolve(accountId);
    handleClose();
  };

  const handleCancel = () => {
    promise.value?.resolve(undefined);
    handleClose();
  };

  return {
    confirm,
    handleClose,
    handleConfirm,
    handleCancel,
    promise,
    isLoading,
    accountOptions,
    accountsQuery,
  };
};
