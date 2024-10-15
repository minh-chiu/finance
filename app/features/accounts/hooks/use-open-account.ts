export const useOpenAccount = () => {
  const isOpen = useState("useNewAccount", () => false);
  const accountId = useState<string | undefined>("accountId", () => undefined);

  const onOpen = (id: string) => {
    isOpen.value = true;
    accountId.value = id;
  };

  const onClose = () => {
    isOpen.value = false;
    accountId.value = undefined;
  };

  return {
    isOpen,
    onOpen,
    onClose,
    accountId,
  };
};
