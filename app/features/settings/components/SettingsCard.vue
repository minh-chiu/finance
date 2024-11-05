<script setup lang="ts">
import PlaidConnect from "~/features/settings/components/PlaidConnect.vue";
import { cn } from "~/lib/utils";

const connectedBank = null;
</script>

<template>
  <Card class="border-none drop-shadow-sm">
    <CardHeader
      class="gap-y-2 lg:flex lg:flex-row lg:items-center lg:justify-between"
    >
      <CardTitle class="line-clamp-1 text-xl">Settings</CardTitle>
    </CardHeader>

    <CardContent>
      <Separator />

      <div class="flex flex-col items-center gap-y-2 py-5 lg:flex-row">
        <p class="w-full text-sm font-medium lg:w-[16.5rem]">Bank Account</p>

        <div class="flex w-full items-center justify-between">
          <div
            :class="
              cn(
                'flex items-center truncate text-sm',
                !connectedBank && 'text-muted-foreground',
              )
            "
          >
            {{
              connectedBank
                ? "Bank account connected"
                : "No bank account connected"
            }}
          </div>

          <PlaidConnect />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped></style>
