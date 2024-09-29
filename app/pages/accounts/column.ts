import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import ColumnHeader from "~/components/DataTable/ColumnHeader.vue";
import { Checkbox } from "~/components/ui/checkbox";
import type { Account } from "~/validations/account.validation";
// import AccountRowActions from "./AccountRowActions.vue";

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
  },

  {
    accessorKey: "title",
    header: ({ column }) => h(ColumnHeader, { column, title: "Name" }),
    cell: ({ row }) => h("div", { class: "w-20" }, row.getValue("title")),
  },

  {
    accessorKey: "actions",
    header: ({ column }) => h("div", { column, title: "Actions" }),
    cell: ({ row }) => {
      return h("div", { row });
    },
  },
];
