import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import ColumnHeader from "~/components/DataTable/ColumnHeader.vue";
import { Checkbox } from "~/components/ui/checkbox";
import AccountRowActions from "~/features/accounts/components/AccountRowActions.vue";
import type { Account } from "~/validations/account.validation";

export const columns: ColumnDef<Account>[] = [
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
    accessorKey: "title",
    header: ({ column }) => h(ColumnHeader, { column, title: "Name" }),

    cell: ({ row }) => {
      return row.original.title;
    },

    enableMultiSort: false,
  },
  {
    id: "actions",
    header: ({ column }) => h(ColumnHeader, { column, title: "Actions" }),
    cell: ({ row }) => h(AccountRowActions, { row }),
  },
];
