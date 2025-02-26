<script setup lang="ts">
import { useQueryAccountsPaginate } from "~/pages/tests/hooks/use-query-accounts-paginate";

const { changePage, paginationInfo } = useQueryAccountsPaginate();

const onPageChange = (_page?: number) => {
  if (_page) changePage(_page);
};
</script>

<template>
  <Pagination
    v-if="paginationInfo"
    v-slot="{ page }"
    :total="paginationInfo._totalData"
    :sibling-count="1"
    show-edges
    :default-page="paginationInfo._page"
    :items-per-page="paginationInfo._limit"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="h-10 w-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
            :disabled="item.value === page"
            @click="onPageChange(item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @update:page="onPageChange" />
      <PaginationLast @update:page="onPageChange" />
    </PaginationList>
  </Pagination>
</template>

<style lang="scss" scoped></style>
