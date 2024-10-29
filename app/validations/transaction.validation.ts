import { z } from "zod";
import type { Account } from "~/validations/account.validation";
import type { Category } from "~/validations/category.validation";

export const CreateTransactionSchema = z.object({
  date: z.coerce.string(),
  accountId: z.string({ required_error: "Account is required" }),
  categoryId: z.string().optional(),
  amount: z.number({ required_error: "Amount is required" }),
  payee: z.string({ required_error: "Payee is required" }).trim(),
  notes: z.string().optional(),
});

export const UpdateTransactionSchema = z.object({
  amount: z.number().optional(),
  payee: z.string().trim().optional(),
  notes: z.string().optional(),
  date: z.coerce.string().optional(),
  accountId: z.string().optional(),
  categoryId: z.string().optional(),
});

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransaction = z.infer<typeof UpdateTransactionSchema>;
export type Transaction = CreateTransaction & {
  _id: string;
};

export type TransactionPagination = Transaction & {
  categoryId: Category;
  accountId: Account;
};
