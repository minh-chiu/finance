import { useAsyncData } from "#app";
import { accountApi } from "~/apis/0-account.api";

export function useAccountsPaginate() {
  // const paginationInfo = useState<PaginationInfo | undefined>("paginationInfo", () => undefined);
  const currentPage = useState("currentPage", () => 1);

  // Fetch dữ liệu bằng useAsyncData
  const { status, data, refresh } = useAsyncData(
    `posts-page-${currentPage.value}`,
    () => accountApi.paginate({ _page: currentPage.value, _limit: 1 }),
    {
      transform: (payload) => ({ ...payload, fetchedAt: Date.now() }),
      getCachedData: (key, nuxtApp) => {
        const data = nuxtApp.payload.data[key];

        if (!data) return null;

        const expiration = new Date(data.fetchedAt);
        expiration.setTime(expiration.getTime() + 30 * 1000);

        const isExpired = Date.now() > expiration.getTime();

        if (isExpired) return null;

        return data;
      },
    },
  );

  const changePage = async (value: number) => {
    currentPage.value = value;

    await refresh();
  };

  return {
    isLoading: computed(() => status.value === "pending"),
    accounts: computed(() => data.value),
    paginationInfo: computed(() => data.value?.paginationInfo),
    changePage,
  };
}
