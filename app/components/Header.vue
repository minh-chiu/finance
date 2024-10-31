<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isMobile = useMediaQuery("(max-width: 1024px)");
</script>

<template>
  <header
    class="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14"
  >
    <div class="mx-auto max-w-screen-2xl">
      <div class="mb-14 flex w-full items-center justify-between">
        <!-- Header Left  -->
        <div class="flex items-center lg:gap-x-16">
          <HeaderLogo v-if="!isMobile" />

          <NavigationMobile v-if="isMobile" />
          <Navigation v-else />
        </div>

        <!-- Header Right -->
        <UserMenu />
      </div>

      <!-- Header Hero -->
      <WelcomeMsg />

      <!-- Filter -->
      <Filters />
    </div>
  </header>
</template>
