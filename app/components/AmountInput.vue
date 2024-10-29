<script setup lang="ts">
import { cn } from "~/lib/utils";

interface Props {
  value?: number;
  disabled?: boolean;
}
interface Emits {
  (e: "change", payload?: number): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const parseValue = computed(() => props.value);
const isIncome = computed(() => Number(props.value) > 0);
const isExpense = computed(() => Number(props.value) < 0);

const amount = computed({
  get: () => props.value,
  set: (val) => emits("change", val),
});

const onReverseValue = () => (amount.value = (props.value || 0) * -1);
</script>

<template>
  <div class="relative">
    <TooltipProvider>
      <Tooltip :delay-duration="100">
        <TooltipTrigger as-child>
          <button
            type="button"
            :class="
              cn(
                'absolute left-1.5 top-1.5 flex items-center justify-center rounded-md bg-slate-400 p-1.5 transition hover:bg-slate-500',
                isIncome && 'bg-emerald-500 hover:bg-emerald-600',
                isExpense && 'bg-rose-500 hover:bg-rose-600',
              )
            "
            @click="onReverseValue"
          >
            <!-- info icon -->
            <Icon
              v-if="!parseValue"
              name="material-symbols:info-outline"
              class="size-3 text-white"
            />

            <!-- isIncome -->
            <Icon
              v-if="isIncome"
              name="icons8:plus"
              class="size-3 text-white"
            />

            <!-- isExpense -->
            <Icon
              v-if="isExpense"
              name="icons8:minus"
              class="size-3 text-white"
            />
          </button>
        </TooltipTrigger>

        <TooltipContent>
          Use [+] for income and [-] for expenses
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <CurrencyInput
      v-model="amount"
      :options="{
        currency: 'VND',
        locale: 'vi-VN',
        hideCurrencySymbolOnFocus: false,
        hideGroupingSeparatorOnFocus: false,
        precision: 0,
      }"
      placeholder="0.00"
    />

    <p className="text-xs text-muted-foreground mt-2">
      <span v-if="isIncome">This will count as an income.</span>

      <span v-if="isExpense">This will count as an expense.</span>
    </p>
  </div>
</template>
