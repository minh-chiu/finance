export const useOpenCategory = () => {
  const isOpen = useState("useNewCategory", () => false);
  const categoryId = useState<string | undefined>(
    "categoryId",
    () => undefined,
  );

  const onOpen = (id: string) => {
    isOpen.value = true;
    categoryId.value = id;
  };

  const onClose = () => {
    isOpen.value = false;
    categoryId.value = undefined;
  };

  return {
    isOpen,
    onOpen,
    onClose,
    categoryId,
  };
};
