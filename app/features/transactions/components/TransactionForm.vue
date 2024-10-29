<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import {
  CreateTransactionSchema,
  type CreateTransaction,
  type UpdateTransaction,
} from "~/validations/transaction.validation";

interface Props {
  id?: string;
  initialValues?: CreateTransaction | UpdateTransaction;
  ísSubmitting?: boolean;
  isDeleting?: boolean;
  categoryOptions: { label: string; value: string }[];
  accountOptions: { label: string; value: string }[];
}

interface Emits {
  (e: "onSubmit", values: CreateTransaction): void;
  // (e: "create-category", values: CreateCategory): void;
  // (e: "create-account", values: CreateAccount): void;
  (e: "onDelete"): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const form = useForm({
  validationSchema: toTypedSchema(CreateTransactionSchema),
  initialValues: props.initialValues,
});

const onSubmit = form.handleSubmit((values: CreateTransaction) =>
  emits("onSubmit", values),
);

const onDelete = () => emits("onDelete");
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <!-- Date -->
    <FormField v-slot="{ componentField }" name="date" :disabled="ísSubmitting">
      <FormField name="date">
        <FormItem>
          <FormLabel>Date</FormLabel>

          <FormControl>
            <DatePicker
              :value="componentField.modelValue"
              :disabled="ísSubmitting"
              @change="(v?: string) => form.setFieldValue('date', v)"
            />

            <FormMessage class="text-[13px] opacity-85" />
          </FormControl>
        </FormItem>
      </FormField>
    </FormField>

    <!-- Account  -->
    <FormField v-slot="{ componentField }" name="accountId">
      <FormItem>
        <FormLabel>Account</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="option in accountOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage class="text-[13px] opacity-85" />
      </FormItem>
    </FormField>

    <!-- Category  -->
    <FormField v-slot="{ componentField }" name="categoryId">
      <FormItem>
        <FormLabel>Category</FormLabel>

        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="option in categoryOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage class="text-[13px] opacity-85" />
      </FormItem>
    </FormField>

    <!-- Payee  -->
    <FormField v-slot="{ componentField }" name="payee">
      <FormItem>
        <FormLabel>Payee</FormLabel>

        <FormControl>
          <Input
            placeholder="Add a payee"
            v-bind="componentField"
            :disabled="ísSubmitting"
          />
        </FormControl>

        <FormMessage class="text-[13px] opacity-85" />
      </FormItem>
    </FormField>

    <!-- Amount  -->
    <FormField v-slot="{ componentField }" name="amount">
      <FormItem>
        <FormLabel>Notes</FormLabel>

        <FormControl>
          <AmountInput
            :value="componentField.modelValue"
            :disabled="ísSubmitting"
            @change="(v?: number) => form.setFieldValue('amount', Number(v))"
          />
        </FormControl>

        <FormMessage class="text-[13px] opacity-85" />
      </FormItem>
    </FormField>

    <!-- Notes  -->
    <FormField v-slot="{ componentField }" name="notes">
      <FormItem>
        <FormLabel>Notes</FormLabel>

        <FormControl>
          <Textarea
            placeholder="Option notes"
            class="resize-none"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage class="text-[13px] opacity-85" />
      </FormItem>
    </FormField>

    <Button type="submit" size="sm" class="w-full" :disabled="ísSubmitting">
      <Icon
        v-if="ísSubmitting"
        name="lucide:loader"
        class="mr-2 h-4 w-4 animate-spin"
      />
      <template v-else>{{ id ? "Update" : "Create" }} Transaction</template>
    </Button>

    <Button
      v-if="!!id"
      type="button"
      variant="outline"
      size="sm"
      class="w-full"
      :disabled="isDeleting"
      @click="onDelete"
    >
      <Icon
        v-if="isDeleting"
        name="lucide:loader"
        class="mr-2 h-4 w-4 animate-spin"
      />

      <Icon v-else name="material-symbols:delete-outline" class="mr-2 size-4" />
      Delete Transaction
    </Button>
  </form>
</template>
