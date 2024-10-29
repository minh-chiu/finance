<script setup lang="ts">
import { useOpenCategory } from "~/features/categories/hooks/use-open-category";
import { cn } from "~/lib/utils";

interface Props {
  category?: string;
  categoryId?: string;
}

const props = defineProps<Props>();
const { onOpen: openCategory } = useOpenCategory();

const categoryId = computed(() => props.categoryId);

const onClick = () => {
  if (!categoryId.value) return;

  openCategory(categoryId.value);
};
</script>

<template>
  <div
    :class="cn('flex cursor-pointer items-center hover:underline')"
    :style="{ color: !category ? 'red' : '' }"
    @click="onClick"
  >
    <Icon
      v-if="!category"
      name="tabler:alert-triangle"
      class="mr-2 size-4 shrink-0"
    />

    <span>
      {{ category || "Uncategorized" }}
    </span>
  </div>
</template>
