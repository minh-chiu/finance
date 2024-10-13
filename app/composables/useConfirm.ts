import type { AsyncDataRequestStatus } from "#app";

export const useConfirm = () => {
  const promise: globalThis.Ref<any> = useState("useConfirm", () => null);
  const isLoading = useState("isLoading", () => false);
  const title = useState("title", () => "");
  const description = useState("description", () => "");

  const setDialog = (_title: string, _description: string) => {
    title.value = _title;
    description.value = _description;
  };

  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      promise.value = { resolve };
    });
  };

  const handleClose = () => {
    promise.value = undefined;
  };
  const handleConfirm = () => {
    promise.value?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise.value?.resolve(false);
    handleClose();
  };

  const setLoading = (status: AsyncDataRequestStatus) => {
    isLoading.value = status === "pending";
  };

  return {
    promise,
    confirm,
    handleClose,
    handleConfirm,
    handleCancel,
    title,
    description,
    setDialog,
    setLoading,
    isLoading,
  };
};
