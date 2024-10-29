export const useNewTransaction = () => {
  const isOpen = useState("useNewTransaction", () => false);

  const onOpen = () => {
    isOpen.value = true;
  };

  const onClose = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
};
