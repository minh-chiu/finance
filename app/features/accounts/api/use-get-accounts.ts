import { accountApi } from "~/apis/0-account.api";

export const useGetAccounts = () =>
  useLazyAsyncData("accounts", () => accountApi.getAll(), {
    server: false,
    dedupe: "defer",
  });
