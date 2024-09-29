<script setup lang="ts">
import { accountApi } from "~/apis/0-account.api";
import AccountToolBar from "~/features/accounts/components/AccountToolBar.vue";
import { columns } from "~/pages/accounts/column";
import { convertStringToRegex } from "~/utils/helpers/data.helper";
import { convertQueryToPaginationParams } from "~/utils/helpers/pagination.helper";
import type { Account } from "~/validations/account.validation";

export interface Filter {
  searchTerm?: string;
}

const router = useRouter();
const route = useRoute();

// const { onOpen } = useNewAccount();
const { getQueryPaginationParams, paginationWatch } =
  useQueryPagination<Account>();

const filter = reactive<Filter>({ searchTerm: getSearchTerm() });
function getSearchTerm() {
  const searchTerm = route.query.search_term;

  if (searchTerm) return searchTerm.toString();

  return undefined;
}

const onFilterChange = (value: Filter) => {
  filter.searchTerm = value.searchTerm;
  const { search_term: _, ...rest } = route.query;

  const newQuery = {
    ...rest,
    _page: undefined,
    search_term: filter.searchTerm,
  };

  router.replace({ query: newQuery });
};

const { status, data } = useAsyncData(
  "accounts-paginate",
  () => {
    const params = convertQueryToPaginationParams({
      ...getQueryPaginationParams(),
      _fields: {
        id: 1,
        title: 1,
      },
      title: convertStringToRegex(filter.searchTerm),
    });

    return accountApi.paginate(params);
  },
  {
    watch: [paginationWatch, filter],
  },
);
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
    <Card class="border-none drop-shadow-none">
      <CardHeader
        class="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between"
      >
        <CardTitle class="line-clamp-1 text-xl">Card Title</CardTitle>

        <Button size="sm">
          <Icon name="carbon:add" class="mr-2 size-4" />
          Add New
        </Button>
      </CardHeader>

      <CardContent>
        <div class="space-y-4">
          <AccountToolBar :filter="filter" @filter-change="onFilterChange" />

          <div class="rounded-sm border-[1px] border-gray-100">
            <DataTable :columns="columns" :data="data?.data" :status="status" />
          </div>

          <div class="rounded-sm border-[1px] border-gray-100">
            <DataTable :columns="columns" :data="data?.data" :status="status" />
          </div>

          <DataTablePagination
            v-if="data?.pageInfo"
            :page-info="data.pageInfo"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>
