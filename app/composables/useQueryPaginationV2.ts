import { convertQueryToPaginationParams } from "~/utils/helpers/pagination.helper";

export const useQueryPaginationV2 = () => {
  const router = useRouter();
  const route = useRoute();

  const handlePageChange = (page: number) => {
    router.push({ query: { ...route.query, _page: page } });
  };

  const handleLimitChange = (limit: number) => {
    router.push({ query: { ...route.query, _limit: limit, _page: 1 } });
  };
  const getQueryPaginationParams = () => {
    const { _sort, _limit, _page } = route.query;

    return {
      _sort: _sort ? String(_sort) : undefined,
      _limit: _limit ? +String(_limit) : undefined,
      _page: _page ? +String(_page) : undefined,
    };
  };

  const sorting = computed(() => route.query._sort?.toString());
  const limit = computed(() =>
    route.query._limit ? +route.query._limit : undefined,
  );
  const page = computed(() =>
    route.query._page ? +route.query._page : undefined,
  );

  const paginationWatch = computed(() => {
    return new URLSearchParams(
      convertQueryToPaginationParams({
        _sort: sorting.value,
        _limit: limit.value,
        _page: page.value,
      }),
    ).toString();
  });

  return {
    handleLimitChange,
    handlePageChange,
    getQueryPaginationParams,
    paginationWatch,
  };
};
