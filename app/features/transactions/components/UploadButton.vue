<script setup lang="ts">
import { parse } from "papaparse";

interface Emits {
  (e: "upload", payload?: any): void;
}

const file = ref();
const emit = defineEmits<Emits>();
const input = useTemplateRef("upload-input");

onUnmounted(() => {
  if (input.value) input.value.value = "";
});

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    file.value = input.files[0];
    parseFile();
  }
};

const parseFile = () => {
  parse(file.value, {
    header: true,
    skipEmptyLines: true,
    complete: function (results: any) {
      emit("upload", results);
    },
  });
};
</script>

<template>
  <Button class="w-full lg:w-auto" size="sm" @click="() => input?.click()">
    <input
      ref="upload-input"
      type="file"
      accept=".csv"
      class="hidden"
      @change="handleFileUpload($event)"
    >

    <Icon name="mdi:upload" class="mr-2 size-4" />
    Upload
  </Button>
</template>

<style lang="scss" scoped></style>
