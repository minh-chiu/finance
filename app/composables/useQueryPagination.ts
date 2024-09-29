import type { Table } from "@tanstack/vue-table";
import { convertQueryToPaginationParams } from "~/utils/helpers/pagination.helper";
import {
  applySortingStateToURL,
  parseSortingQueryFromURL,
} from "~/utils/helpers/sorting.helper";
type Sort = { desc: boolean; id: string };

export const useQueryPagination = <T>() => {
  const router = useRouter();
  const route = useRoute();

  const table = useState<Table<T> | null>("table", () => null);
  const rowsSelected = useState<T[]>("rowsSelected", () => []);
  const sortingState = useState<Sort[]>("sorting", () =>
    parseSortingQueryFromURL(route.query),
  );

  const setTable = (value: Table<T>) => {
    table.value = value;
  };

  const handleRowSelectionChange = () => {
    if (!table.value) return (rowsSelected.value = []);

    const rows = table.value.getFilteredSelectedRowModel().rows;
    rowsSelected.value = rows.map((row) => row.original);
  };

  const resetRowSelection = () => {
    if (!table.value) return (rowsSelected.value = []);

    table.value.resetRowSelection();
  };

  const handleSortingChange = (sortValue: Sort[]) => {
    sortingState.value = sortValue;
    applySortingStateToURL(sortValue);
  };

  const handlePageChange = (page: number) => {
    router.push({ query: { ...route.query, _page: page } });
  };

  const handleLimitChange = (limit: number) => {
    router.push({ query: { ...route.query, _limit: limit, _page: 1 } });
  };
  const getQueryPaginationParams = () => {
    resetRowSelection();

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
    confirm,
    sortingState,
    rowsSelected,
    handleLimitChange,
    handleSortingChange,
    handlePageChange,
    getQueryPaginationParams,
    paginationWatch,
    handleRowSelectionChange,
    setTable,
    table,
    resetRowSelection,
  };
};
