import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string({ required_error: "Title is required" }).trim(),
  status: z.string({ required_error: "Status is required" }).trim(),
  label: z.string({ required_error: "Label is required" }).trim(),
  priority: z.string({ required_error: "Priority is required" }).trim(),
});

export const UpdateTaskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
  label: z.string().optional(),
  priority: z.string().optional(),
});

export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
export type Task = {
  _id: string;
  title: string;
  plainId?: string;
  userId: string;
};
