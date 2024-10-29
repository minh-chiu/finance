export const useOpenTransaction = () => {
  const isOpen = useState("useNewTransaction", () => false);
  const transactionId = useState<string | undefined>(
    "transactionId",
    () => undefined,
  );

  const onOpen = (id: string) => {
    isOpen.value = true;
    transactionId.value = id;
  };

  const onClose = () => {
    isOpen.value = false;
    transactionId.value = undefined;
  };

  return {
    isOpen,
    onOpen,
    onClose,
    transactionId,
  };
};
