<script setup lang="ts">
import AccountTable from "~/features/accounts/components/DataTable/AccountTable.vue";
import UserNav from "~/features/tasks/components/UserNav.vue";
import { columns } from "~/pages/tasks/column";
import type { Priority, Status } from "~/types/0-task";
import {
  applyQueryToURL,
  parseQueryToObject,
} from "~/utils/helpers/query.helper";

import { taskApi } from "~/apis/0-task.api";
import { priorities, statuses } from "~/pages/tasks/data";
import { convertStringToRegex } from "~/utils/helpers/data.helper";
import {
  convertQueryToPaginationParams,
  getQueryParams,
  URLSearchParamsString,
} from "~/utils/helpers/pagination.helper";

export interface Filter {
  searchTerm?: string;
  statuses?: Status[];
  priorities?: Priority[];
}

const route = useRoute();

// Get filter
const getInitialFilter = (): Filter => {
  const query = parseQueryToObject(route.query);
  const filter = {};

  // filter by search
  if (query.search_term)
    Object.assign(filter, { searchTerm: query.search_term });

  // filter by status
  if (query.statuses?.length)
    Object.assign(filter, {
      statuses: statuses.filter((st) => query.statuses.includes(st.value)),
    });

  // filter by priority
  if (query.priorities?.length) {
    Object.assign(filter, {
      priorities: priorities.filter((pr) =>
        query.priorities.includes(pr.value),
      ),
    });
  }

  return filter;
};

const filter = ref<Filter>(getInitialFilter());
const initialState = computed(() => ({
  _sort: getQueryParams(route.query)._sort,
  _limit: getQueryParams(route.query)._limit,
  _page: getQueryParams(route.query)._page,
}));

const paginationWatch = computed(() => {
  return URLSearchParamsString(initialState.value);
});

const onPageChange = (_page?: number) => applyQueryToURL({ _page });
const onLimitChange = (_limit?: number) => applyQueryToURL({ _limit });
const onFilterChange = (value: Filter) => {
  filter.value = value;

  applyQueryToURL({
    search_term: filter.value.searchTerm,
    statuses: filter.value.statuses?.map((item) => item.value),
    priorities: filter.value.priorities?.map((item) => item.value),
  });
};

// call api
const paginateTasks = () => {
  const params = convertQueryToPaginationParams({
    ...initialState.value,
    title: convertStringToRegex(filter.value.searchTerm),
  });

  return taskApi.paginate(params);
};

const { data } = useAsyncData("tasks-pagination", paginateTasks, {
  watch: [paginationWatch, filter],
});
</script>

<template>
  <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>

    <AccountTable
      v-if="data"
      :columns="columns"
      :data="data.data"
      :page-info="data.pageInfo"
      :statuses="statuses"
      :priorities="priorities"
      :initial-state="initialState"
      :filter="filter"
      @page-change="onPageChange"
      @limit-change="onLimitChange"
      @filter-change="onFilterChange"
    />
  </div>
</template>
