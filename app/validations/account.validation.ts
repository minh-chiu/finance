import { z } from "zod";

export const CreateAccountSchema = z.object({
  title: z.string({ required_error: "Name is required" }).trim(),
});

export const UpdateAccountSchema = z.object({
  title: z.string({ required_error: "Name is required" }).trim(),
  plainId: z.string().optional(),
  userId: z.string().optional(),
});

export type CreateAccount = z.infer<typeof CreateAccountSchema>;
export type UpdateAccount = z.infer<typeof UpdateAccountSchema>;
export type Account = {
  _id: string;
  title: string;
  plainId?: string;
  userId: string;
};
