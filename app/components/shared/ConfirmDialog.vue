<script setup lang="ts">
const { promise, handleCancel, handleConfirm, title, description, isLoading } =
  useConfirm();
</script>

<template>
  <AlertDialog :open="!!promise || isLoading">
    <AlertDialogContent class="z-[99]">
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>{{ description }} </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">Cancel</AlertDialogCancel>
        <AlertDialogAction :disabled="isLoading" @click="handleConfirm">
          <Icon
            v-if="isLoading"
            name="lucide:loader"
            class="mr-2 h-4 w-4 animate-spin"
          />

          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
