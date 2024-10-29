import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import ColumnHeader from "~/components/DataTable/ColumnHeader.vue";
import { Checkbox } from "~/components/ui/checkbox";
import CategoryActions from "~/features/categories/components/CategoryActions.vue";
import type { Category } from "~/validations/category.validation";

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),

        "onUpdate:checked": (value: boolean) =>
          table.toggleAllPageRowsSelected(!!value),

        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),

    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),

        "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),

        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => h(ColumnHeader, { column, title: "Name" }),

    cell: ({ row }) => {
      return row.original.name ? row.original.name : "N/A";
    },

    enableMultiSort: false,
  },
  {
    id: "actions",
    header: ({ column }) => h(ColumnHeader, { column, title: "Actions" }),
    cell: ({ row }) => h(CategoryActions, { row }),
  },
];
