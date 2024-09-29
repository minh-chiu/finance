import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Option = {
  label: string;
  value: string;
  icon?: string;
  amount?: number;
};

export type Label = {
  value: string;
  label: string;
};
export type Status = {
  _id?: string;
  value: string;
  label: string;
  icon: string;
  amount: number;
};

export type Priority = {
  _id?: string;
  value: string;
  label: string;
  icon: string;
  amount: number;
};

export type Task = {
  _id?: string;
  id: string;
  title: string;
  status: Status;
  label: Label;
  priority: Priority;
};
