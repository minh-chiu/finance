<script setup lang="ts">
import { accountApi } from "~/apis/0-account.api";
import AccountTable from "~/features/accounts/components/AccountTable.vue";
import { useNewAccount } from "~/features/accounts/hooks/use-new-account";
import { columns } from "~/pages/accounts/column";
import type { PaginationInfo } from "~/types/paginate-response.type";
import { convertStringToRegex } from "~/utils/helpers/data.helper";
import {
  convertQueryToPaginationParams,
  getQueryParams,
  URLSearchParamsString,
} from "~/utils/helpers/pagination.helper";
import {
  applyQueryToURL,
  parseQueryToObject,
} from "~/utils/helpers/query.helper";

const { onOpen } = useNewAccount();

const route = useRoute();

export interface AccountFilter {
  title?: string;
}

// Get filter
const getInitialFilter = (): AccountFilter => {
  const query = parseQueryToObject(route.query);
  const filter: AccountFilter = {};

  // filter by search
  if (query.title) Object.assign(filter, { searchTerm: query.title });

  return filter;
};

const filter = ref<AccountFilter>(getInitialFilter());
const onFilterChange = (value: AccountFilter) => {
  filter.value = value;
  applyQueryToURL(filter.value);
};

const initialState = computed(() => ({
  _sort: getQueryParams(route.query)._sort,
  _limit: getQueryParams(route.query)._limit,
  _page: getQueryParams(route.query)._page,
}));
const paginationWatch = computed(() => {
  return URLSearchParamsString(initialState.value);
});
const onPageChange = (payload?: Pick<PaginationInfo, "_page" | "_limit">) =>
  applyQueryToURL(payload);

// call api
const paginateAccounts = () => {
  const params = convertQueryToPaginationParams({
    ...initialState.value,
    title: convertStringToRegex(filter.value.title),
  });

  return accountApi.paginate(params);
};

const { data } = useAsyncData("accounts-pagination", paginateAccounts, {
  watch: [paginationWatch, filter],
});
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
    <Card class="border-none drop-shadow-none">
      <CardHeader
        class="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between"
      >
        <CardTitle class="line-clamp-1 text-xl">Account Page</CardTitle>

        <Button size="sm" @click="onOpen">
          <Icon name="carbon:add" class="mr-2 size-4" />
          Add New
        </Button>
      </CardHeader>

      <CardContent>
        <AccountTable
          v-if="data"
          :columns="columns"
          :data="data.data"
          :pagination-info="data.paginationInfo"
          :initial-state="initialState"
          :filter="filter"
          @filter-change="onFilterChange"
          @page-change="onPageChange"
        />
      </CardContent>
    </Card>
  </div>
</template>

<style lang="scss" scoped></style>
