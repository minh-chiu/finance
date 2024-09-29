<script lang="ts" setup>
import { menus } from "~/utils/constants";
</script>

<template>
  <nav class="flex items-center gap-x-2 overflow-x-auto">
    <NavButton
      v-for="menu in menus"
      :key="menu.href"
      :href="menu.href"
      :label="menu.label"
    />
  </nav>
</template>
