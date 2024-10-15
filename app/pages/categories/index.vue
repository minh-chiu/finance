<script setup lang="ts">
import { categoryApi } from "~/apis/1-category.api";
import CategoryTable from "~/features/categories/components/CategoryTable.vue";
import { useNewCategory } from "~/features/categories/hooks/use-new-category";
import { columns } from "~/pages/categories/column";
import type { PageInfo } from "~/types/paginate-response.type";
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

const { onOpen } = useNewCategory();

const route = useRoute();

export interface CategoryFilter {
  name?: string;
}

// Get filter
const getInitialFilter = (): CategoryFilter => {
  const query = parseQueryToObject(route.query);
  const filter: CategoryFilter = {};

  // filter by search
  if (query.name) Object.assign(filter, { searchTerm: query.name });

  return filter;
};

const filter = ref<CategoryFilter>(getInitialFilter());
const onFilterChange = (value: CategoryFilter) => {
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
const onPageChange = (payload?: Pick<PageInfo, "_page" | "_limit">) =>
  applyQueryToURL(payload);

// call api
const paginateCategories = () => {
  const params = convertQueryToPaginationParams({
    ...initialState.value,
    name: convertStringToRegex(filter.value.name),
  });

  return categoryApi.paginate(params);
};

const { data } = useAsyncData("categories-pagination", paginateCategories, {
  watch: [paginationWatch, filter],
});
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
    <Card class="border-none drop-shadow-none">
      <CardHeader
        class="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between"
      >
        <CardTitle class="line-clamp-1 text-xl">Categories Page</CardTitle>

        <Button size="sm" @click="onOpen">
          <Icon name="carbon:add" class="mr-2 size-4" />
          Add New
        </Button>
      </CardHeader>

      <CardContent>
        <CategoryTable
          v-if="data"
          :columns="columns"
          :data="data.data"
          :page-info="data.pageInfo"
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
