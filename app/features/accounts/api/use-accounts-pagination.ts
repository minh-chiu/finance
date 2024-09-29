import { accountApi } from "~/apis/0-account.api";
import type { PageInfo } from "~/types/paginate-reponse.type";
import type { Nullable } from "~/utils/types/nullable";
import type { Account } from "~/validations/account.validation";

export const useAccountsPagination = () => {
  const accounts = useState<Account[]>("accounts", () => []);
  const pageInfo = useState<Nullable<PageInfo>>("pageInfo", () => null);
  const isLoading = useState("isLoading", () => false);

  const fetch = async (page: number, limit: number) => {
    isLoading.value = true;
    const pagination = await accountApi.paginate({
      _limit: limit,
      _page: page,
    });

    accounts.value = pagination.data;
    pageInfo.value = pagination.pageInfo;
    isLoading.value = false;
  };

  return {
    fetch,
    accounts,
    pageInfo,
    isLoading,
  };
};
