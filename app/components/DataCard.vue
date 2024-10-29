<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import CountUp from "vue-countup-v3";
import { cn } from "~/lib/utils";
import { formatCurrency } from "~/pages/transactions/column";
import { formatPercentage } from "~/utils/helpers/format-data-range.helper";

const boxVariant = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "text-blue-500",
      success: "text-emerald-500",
      danger: "text-rose-500",
      warning: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface Props
  extends /* @vue-ignore */ BoxVariants,
    /* @vue-ignore */ IconVariants {
  icon: string;
  title: string;
  value?: number;
  dateRange: string;
  percentageChange?: number;
  variant: BoxVariants["variant"];
}

const {
  icon,
  title,
  value = 0,
  dateRange,
  percentageChange = 0,
  variant,
} = defineProps<Props>();
</script>

<template>
  <Card class="border-none drop-shadow-sm">
    <CardHeader class="flex flex-row items-center justify-between gap-x-4">
      <div class="space-y-2">
        <CardTitle class="line-clamp-1 text-2xl">{{ title }}</CardTitle>
        <CardDescription class="line-clamp-1">{{ dateRange }}</CardDescription>
      </div>

      <div :class="cn(boxVariant({ variant }))">
        <Icon :name="icon" :class="cn(iconVariant({ variant }))" />
      </div>
    </CardHeader>

    <CardContent>
      <h1 class="mb-2 line-clamp-1 break-all text-2xl font-bold">
        <CountUp
          :start-val="0"
          :end-val="value"
          :decimal-places="2"
          :options="{
            formattingFn: formatCurrency,
          }"
        />
      </h1>

      <p
        :class="
          cn(
            'line-clamp-1 text-sm text-muted-foreground',
            percentageChange > 0 && 'text-emerald-500',
            percentageChange < 0 && 'text-rose-500',
          )
        "
      >
        {{ formatPercentage(percentageChange) }} from last period
      </p>
    </CardContent>
  </Card>
</template>
