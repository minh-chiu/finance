export const useNewAccount = () => {
  const isOpen = useState("useNewAccount", () => false);

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
