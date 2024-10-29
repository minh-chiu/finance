<script setup lang="ts">
interface Props {
  country: string;
  countryName: string;
}

const props = defineProps<Props>();

const flagUrl = computed(
  () => `https://flagcdn.com/w40/${props.country.toLowerCase()}.png`,
);
</script>

<template>
  <span class="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
    <img
      v-if="country"
      :src="flagUrl"
      :alt="countryName"
      :title="countryName"
    >
  </span>
</template>
