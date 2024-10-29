<script setup lang="ts"></script>

<template>
  <Card class="border-none drop-shadow-sm">
    <CardHeader
      class="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0"
    >
      <Skeleton class="h-8 w-48" />
      <Skeleton class="h-8 w-full lg:w-[120px]" />
    </CardHeader>

    <CardContent>
      <div class="flex h-[350px] w-full items-center justify-center">
        <Icon
          name="lucide:loader"
          class="h-6 w-6 animate-spin text-slate-300"
        />
      </div>
    </CardContent>
  </Card>
</template>
