import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";
import type {
  Category,
  CreateCategory,
  UpdateCategory,
} from "~/validations/category.validation";

const CATEGORY_URL = "/categories";
export const categoryApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Category>> => {
    return guestFetch.get(`${CATEGORY_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Category> => {
    return authFetch.get(`${CATEGORY_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Category[]> => {
    return guestFetch.get(CATEGORY_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (
    body: CreateCategory,
    options?: FetchOptions,
  ): Promise<CreateCategory> => {
    return authFetch.post(CATEGORY_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: UpdateCategory,
    options?: FetchOptions,
  ): Promise<Category> => {
    return authFetch.patch(`${CATEGORY_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${CATEGORY_URL}/${ids.join(",")}/bulk`);
  },

  deleteById: (id: string): Promise<CreateCategory> => {
    return authFetch.delete(`${CATEGORY_URL}/${id}`);
  },
};
