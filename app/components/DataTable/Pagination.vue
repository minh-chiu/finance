<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-icons/vue";
import type { PageInfo } from "~/types/paginate-response.type";

interface Props {
  pageInfo: PageInfo;
}
type Emits = {
  pageChange: [page?: number];
  limitChange: [pageSize: number];
};

defineProps<Props>();
const emits = defineEmits<Emits>();

const onPageChange = (page?: number) => emits("pageChange", page);
const onLimitChange = (pageSize: number) => emits("limitChange", pageSize);
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-xs text-muted-foreground">
      {{ 0 }} of {{ pageInfo._totalData }} row(s) selected.
    </div>

    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-xs text-muted-foreground">Rows per page</p>
        <Select
          :model-value="`${pageInfo._limit}`"
          @update:model-value="(val: string) => onLimitChange(+val)"
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
        class="flex w-[100px] items-center justify-center text-xs text-muted-foreground"
      >
        Page {{ pageInfo._page }} of {{ pageInfo._totalPages }}
      </div>

      <div class="flex items-center space-x-2">
        <Button
          variant="ghost"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!pageInfo._hasPrevPage"
          @click="onPageChange(undefined)"
        >
          <span class="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          class="h-8 w-8 p-0"
          :disabled="!pageInfo._hasPrevPage"
          @click="onPageChange(pageInfo._prevPage)"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          :disabled="!pageInfo._hasNextPage"
          @click="onPageChange(pageInfo._nextPage)"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!pageInfo._hasNextPage"
          @click="onPageChange(pageInfo._totalPages)"
        >
          <span class="sr-only">Go to last page</span>
          <DoubleArrowRightIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
