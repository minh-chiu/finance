import type { RowSelectionState } from "@tanstack/vue-table";

export const useRowSelected = () => {
  const selectedRowIds = useState<RowSelectionState>(
    "selectedRowIds",
    () => ({}),
  );

  const setSelectedRowIds = (values: RowSelectionState) => {
    selectedRowIds.value = values;
  };

  return {
    selectedRowIds,
    setSelectedRowIds,
  };
};
