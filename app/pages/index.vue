<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: "auth",
});
</script>

<template>
  <div class="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
    <DataGrid />
    <DataCharts />
  </div>
</template>
