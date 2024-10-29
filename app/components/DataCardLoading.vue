<script setup lang="ts"></script>

<template>
  <Card class="h-[192px] border-none drop-shadow-sm">
    <CardHeader class="flex flex-row items-center justify-between gap-x-4">
      <div class="space-x-2">
        <Skeleton class="h-6 w-24" />
        <Skeleton class="h-4 w-40" />
      </div>

      <Skeleton class="size-12" />
    </CardHeader>

    <CardContent>
      <Skeleton class="mb-2 h-10 w-24 shrink-0" />
      <Skeleton class="h-4 w-40 shrink-0" />
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped></style>
