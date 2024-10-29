import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim(),
  plainId: z.string().optional(),
  userId: z.string().optional(),
});

export const UpdateCategorySchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim(),
  plainId: z.string().optional(),
  userId: z.string().optional(),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
export type Category = CreateCategory & {
  _id: string;
};
