<script setup lang="ts">
import "~/assets/css/global.css";
import NewAccountSheet from "~/features/accounts/NewAccountSheet.vue";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Toaster />
  <ConfirmDialog />
  <NewAccountSheet />
</template>
