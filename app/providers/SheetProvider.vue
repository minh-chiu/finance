<script setup lang="ts">
import NewAccountSheet from "~/features/accounts/components/NewAccountSheet.vue";

const isMounted = ref(false);

onMounted(() => (isMounted.value = true));
</script>

<template>
  <template v-if="isMounted">
    <ConfirmDialog />
    <NewAccountSheet />
  </template>
</template>
