import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";
import type {
  Account,
  CreateAccount,
  UpdateAccount,
} from "~/validations/account.validation";

const REVIEW_URL = "/accounts";
export const accountApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<Account>> => {
    return guestFetch.get(`${REVIEW_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Account> => {
    return authFetch.get(`${REVIEW_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Account[]> => {
    return guestFetch.get(REVIEW_URL, query, options);
  },

  //  ----- Method: POST -----
  create: (
    body: CreateAccount,
    options?: FetchOptions,
  ): Promise<CreateAccount> => {
    return authFetch.post(REVIEW_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: UpdateAccount,
    options?: FetchOptions,
  ): Promise<Account> => {
    return authFetch.patch(`${REVIEW_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${REVIEW_URL}/${ids.join(",")}/bulk`);
  },

  deleteById: (id: string): Promise<CreateAccount> => {
    return authFetch.delete(`${REVIEW_URL}/${id}`);
  },
};
