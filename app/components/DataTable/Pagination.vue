<script setup lang="ts">
import type { PageInfo } from "~/types/paginate-reponse.type";

interface Props {
  pageInfo: PageInfo;
}
defineProps<Props>();

const { handleLimitChange, handlePageChange, rowsSelected } =
  useQueryPagination();
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ rowsSelected.length }} of {{ pageInfo._totalData }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Rows per page</p>
        <Select
          :model-value="`${pageInfo._limit}`"
          @update:model-value="(val: string) => handleLimitChange(+val)"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${pageInfo._limit}`" />
          </SelectTrigger>

          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        class="flex w-[100px] items-center justify-center text-sm font-medium"
      >
        Page {{ pageInfo._page }} of
        {{ pageInfo._totalPages }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!pageInfo._hasPrevPage"
          @click="handlePageChange(1)"
        >
          <span class="sr-only">Go to first page</span>
          <Icon name="ri:arrow-left-double-fill" class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!pageInfo._hasPrevPage"
          @click="handlePageChange(pageInfo._prevPage || 1)"
        >
          <span class="sr-only">Go to previous page</span>
          <Icon name="material-symbols:chevron-left" class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!pageInfo._hasNextPage"
          @click="handlePageChange(pageInfo._nextPage || 1)"
        >
          <span class="sr-only">Go to next page</span>
          <Icon name="material-symbols:chevron-right" class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!pageInfo._hasNextPage"
          @click="handlePageChange(pageInfo._totalPages || 1)"
        >
          <span class="sr-only">Go to last page</span>
          <Icon name="ri:arrow-right-double-fill" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
