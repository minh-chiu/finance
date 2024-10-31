<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { CalendarIcon } from "@radix-icons/vue";
import { subDays } from "date-fns";
import type { DateRange } from "radix-vue";
import { ref } from "vue";
import { cn } from "~/lib/utils";
import { formatDataRange } from "~/utils/helpers/format-data-range.helper";

const router = useRouter();
const query = useRoute().query;

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 30);

const from = ref(query.from ? new Date(query.from as string) : defaultFrom);
const to = ref(query.to ? new Date(query.to as string) : defaultTo);

const dateRangeLabel = computed(() => {
  return formatDataRange({ from: from.value, to: to.value });
});

const value = ref({
  start: new CalendarDate(
    from.value.getFullYear(),
    from.value.getMonth() + 1,
    from.value.getDate(),
  ),
  end: new CalendarDate(
    to.value.getFullYear(),
    to.value.getMonth() + 1,
    to.value.getDate(),
  ),
}) as Ref<DateRange>;

const onChange = (date: DateRange) => {
  if (date.start && date.end) {
    value.value = date;

    const queryItem = {
      ...query,
      from: date.start.toString(),
      to: date.end.toString(),
    };

    router.push({ query: queryItem, replace: true });
  }
};
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        :class="
          cn(
            'h-9 w-full rounded-md border-none bg-white/10 px-3 text-left font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto',
            !value && 'text-muted-foreground',
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ dateRangeLabel }}</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:model-value="onChange"
      />
    </PopoverContent>
  </Popover>
</template>
