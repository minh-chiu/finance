import { useQuery } from "@tanstack/vue-query";
import { accountApi } from "~/apis/0-account.api";

export function useQueryAccountsPaginate() {
  const currentPage = useState("currentPage", () => 1);

  const { isLoading, data } = useQuery({
    queryKey: ["accounts", currentPage],
    queryFn: () => accountApi.paginate({ _page: currentPage.value, _limit: 1 }),
    staleTime: 1000 * 5, // 5 seconds
  });

  const changePage = (value: number) => (currentPage.value = value);

  return {
    isLoading,
    accounts: computed(() => data.value?.data || []),
    paginationInfo: computed(() => data.value?.paginationInfo),
    changePage,
  };
}
