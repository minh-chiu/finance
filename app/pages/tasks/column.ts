import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import ColumnHeader from "~/components/DataTable/ColumnHeader.vue";
import IconColumn from "~/components/shared/IconColumn.vue";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import AccountRowActions from "~/features/accounts/components/AccountActions.vue";
import type { Task } from "~/types/0-task";

export const columns: ColumnDef<Task>[] = [
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
    accessorKey: "id",
    header: ({ column }) => h(ColumnHeader, { column, title: "Task" }),
    cell: ({ row }) => h("div", { class: "w-20" }, row.getValue("id")),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) => h(ColumnHeader, { column, title: "Title" }),

    cell: ({ row }) => {
      const label = row.original.label,
        title = row.original.title;

      return h("div", { class: "flex space-x-2" }, [
        label.label
          ? h(Badge, { variant: "outline" }, () => label.label)
          : null,
        h("span", { class: "max-w-[500px] truncate font-medium" }, title),
      ]);
    },

    enableMultiSort: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => h(ColumnHeader, { column, title: "Status" }),

    cell: ({ row }) => {
      const status = row.original.status;

      if (!status) return null;

      return h("div", { class: "flex w-[100px] items-center" }, [
        status?.icon &&
          h(IconColumn, {
            class: "mr-2 h-4 w-4 text-muted-foreground",
            name: status.icon,
          }),
        h("span", status.label),
      ]);
    },

    enableMultiSort: false,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => h(ColumnHeader, { column, title: "Priority" }),
    cell: ({ row }) => {
      const priority = row.original.priority;

      if (!priority) return null;

      return h("div", { class: "flex items-center" }, [
        priority.icon &&
          h(IconColumn, {
            class: "mr-2 h-4 w-4 text-muted-foreground",
            name: priority.icon,
          }),
        h("span", {}, priority.label),
      ]);
    },
    enableMultiSort: false,
  },
  {
    id: "actions",
    header: ({ column }) => h(ColumnHeader, { column, title: "Actions" }),
    cell: ({ row }) => h(AccountRowActions, { row }),
  },
];
