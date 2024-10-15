import { accountApi } from "~/apis/0-account.api";

export const useGetAccount = (id: string) =>
  useLazyAsyncData(`account-${id}`, () => accountApi.getById(id));
