import type { ColumnDef } from "@tanstack/vue-table";
import { format } from "date-fns";
import { h } from "vue";
import ColumnHeader from "~/components/DataTable/ColumnHeader.vue";
import Badge from "~/components/ui/badge/Badge.vue";
import { Checkbox } from "~/components/ui/checkbox";
import AccountColumn from "~/features/transactions/components/AccountColumn.vue";
import CategoryColumn from "~/features/transactions/components/CategoryColumn.vue";
import TransactionActions from "~/features/transactions/components/TransactionActions.vue";
import type { TransactionPagination } from "~/validations/transaction.validation";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export const columns: ColumnDef<TransactionPagination>[] = [
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
    accessorKey: "date",
    header: ({ column }) => h(ColumnHeader, { column, title: "Date" }),
    cell: ({ row }) => format(row.original.date, "dd MMM, yyyy"),
    enableMultiSort: false,
  },

  {
    accessorKey: "category",
    header: ({ column }) => h(ColumnHeader, { column, title: "Category" }),
    cell: ({ row }) =>
      h(CategoryColumn, {
        category: row.original.categoryId?.name,
        categoryId: row.original.categoryId?._id,
      }),
    enableMultiSort: false,
  },

  {
    accessorKey: "payee",
    header: ({ column }) => h(ColumnHeader, { column, title: "Payee" }),
    cell: ({ row }) => row.original.payee,
    enableMultiSort: false,
  },

  {
    accessorKey: "amount",
    header: ({ column }) => h(ColumnHeader, { column, title: "Amount" }),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount") as string);

      return h(Badge, {
        variant: amount > 0 ? "primary" : "destructive",
        class: "text-xs font-medium px-2.5 py-1.5 rounded-full",
        innerHTML: formatCurrency(amount),
      });
    },
    enableMultiSort: false,
  },

  {
    accessorKey: "account",
    header: ({ column }) => h(ColumnHeader, { column, title: "Account" }),
    cell: ({ row }) =>
      h(AccountColumn, {
        account: row.original.accountId?.title,
        accountId: row.original.accountId?._id,
      }),
    enableMultiSort: false,
  },

  {
    id: "actions",
    header: ({ column }) => h(ColumnHeader, { column, title: "Actions" }),
    cell: ({ row }) => h(TransactionActions, { row }),
  },
];
