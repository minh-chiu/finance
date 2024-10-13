import type { Task } from "~/types/0-task";
import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";
import type { CreateTask } from "~/validations/task.validation";

const TASK_URL = "/tasks";
export const taskApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Task>> => {
    return guestFetch.get(`${TASK_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Task> => {
    return authFetch.get(`${TASK_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Task[]> => {
    return guestFetch.get(TASK_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (body: CreateTask, options?: FetchOptions): Promise<Task> => {
    return authFetch.post(TASK_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Task,
    options?: FetchOptions,
  ): Promise<Task> => {
    return authFetch.patch(`${TASK_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${TASK_URL}/${ids.join(",")}/bulk`);
  },

  deleteById: (id: string): Promise<Task> => {
    return authFetch.delete(`${TASK_URL}/${id}`);
  },
};
