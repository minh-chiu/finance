import type { PaginateResponse } from "~/types/paginate-response.type";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types/fetch.types";
import type {
  CreateTransaction,
  Transaction,
  TransactionPagination,
  UpdateTransaction,
} from "~/validations/transaction.validation";

const TRANSACTION_URL = "/transactions";
export const transactionApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<PaginateResponse<TransactionPagination>> => {
    return guestFetch.get(`${TRANSACTION_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Transaction> => {
    return authFetch.get(`${TRANSACTION_URL}/${id}`, query, options);
  },

  getAll: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Transaction[]> => {
    return guestFetch.get(TRANSACTION_URL, query, options);
  },

  //  ----- Method: POST -----
  createMany: (
    body: CreateTransaction[],
    options?: FetchOptions,
  ): Promise<CreateTransaction> => {
    return authFetch.post(`${TRANSACTION_URL}/bulk`, body, options);
  },

  create: (
    body: CreateTransaction,
    options?: FetchOptions,
  ): Promise<CreateTransaction> => {
    return authFetch.post(TRANSACTION_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: UpdateTransaction,
    options?: FetchOptions,
  ): Promise<Transaction> => {
    return authFetch.patch(`${TRANSACTION_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${TRANSACTION_URL}/${ids.join(",")}/bulk`);
  },

  deleteById: (id: string): Promise<CreateTransaction> => {
    return authFetch.delete(`${TRANSACTION_URL}/${id}`);
  },
};
