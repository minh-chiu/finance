import { transactionApi } from "~/apis/0-transaction.api";

export const useGetTransaction = (id: string) =>
  useLazyAsyncData(`transaction-${id}`, () => transactionApi.getById(id));
