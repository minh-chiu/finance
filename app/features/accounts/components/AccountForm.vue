<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  CreateTaskSchema,
  type CreateTask,
} from "~/validations/task.validation";

interface Props {
  id?: string;
  initialValues?: CreateTask;
  ísSubmitting?: boolean;
  isDeleting?: boolean;
  disabled?: boolean;
}

interface Emits {
  (e: "onSubmit", values: CreateTask): void;
  (e: "onDelete"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const form = useForm({
  validationSchema: toTypedSchema(CreateTaskSchema),
  initialValues: props.initialValues,
});

const onSubmit = form.handleSubmit((values: CreateTask) =>
  emits("onSubmit", values),
);

const onDelete = () => {
  emits("onDelete");
};
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <FormField
      v-slot="{ componentField }"
      name="title"
      :disabled="ísSubmitting"
    >
      <FormItem>
        <FormLabel>Name</FormLabel>

        <FormControl>
          <Input
            type="text"
            placeholder="eg: Cash, Bank, Credit Card"
            v-bind="componentField"
          />

          <FormMessage class="text-[13px] opacity-85" />
        </FormControl>
      </FormItem>
    </FormField>

    <Button type="submit" size="sm" class="w-full" :disabled="disabled">
      <Icon
        v-if="ísSubmitting"
        name="lucide:loader"
        class="mr-2 h-4 w-4 animate-spin"
      />
      {{ id ? "Update" : "Create" }} Account
    </Button>

    <Button
      v-if="!!id"
      type="button"
      variant="outline"
      size="sm"
      class="w-full"
      :disabled="disabled"
      @click="onDelete"
    >
      <Icon
        v-if="isDeleting"
        name="lucide:loader"
        class="mr-2 h-4 w-4 animate-spin"
      />

      <Icon v-else name="material-symbols:delete-outline" class="mr-2 size-4" />
      Delete Account
    </Button>
  </form>
</template>
