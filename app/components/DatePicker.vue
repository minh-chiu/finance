<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
  type DateValue,
} from "@internationalized/date";
import { CalendarIcon } from "@radix-icons/vue";
import { toDate } from "radix-vue/date";
import { cn } from "~/lib/utils";

interface Props {
  value?: string;
  disabled?: boolean;
}
interface Emits {
  (event: "change", value?: string): void;
}

const df = new DateFormatter("vi-VN", {
  dateStyle: "long",
});

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const date = computed({
  get: () => (props.value ? parseDate(props.value) : undefined),
  set: (val) => val,
});
const placeholder = ref();

const onChange = (v?: DateValue) => {
  emit("change", (v && v.toString()) || undefined);
  // emit("change", v.toString());
};
</script>

<template>
  <div>
    <Popover>
      <PopoverTrigger as-child>
        <FormControl>
          <Button
            variant="outline"
            :class="
              cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )
            "
          >
            <span>{{ date ? df.format(toDate(date)) : "Pick a date" }}</span>
            <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
          </Button>
          <input hidden >
        </FormControl>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar
          v-model:placeholder="placeholder"
          v-model="date"
          calendar-label="Date of birth"
          initial-focus
          :min-value="new CalendarDate(1900, 1, 1)"
          :max-value="today(getLocalTimeZone())"
          @update:model-value="onChange"
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
