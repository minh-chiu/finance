<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";
import { useSelectAccount } from "~/features/accounts/hooks/use-select-account";

const { promise, handleCancel, handleConfirm, isLoading, accountOptions } =
  useSelectAccount();

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      accountId: z.string({ required_error: "Account is required" }),
    }),
  ),
});

const onSubmit = form.handleSubmit((values: { accountId: string }) => {
  handleConfirm(values.accountId);
});
</script>

<template>
  <AlertDialog :open="!!promise">
    <AlertDialogContent class="z-[99]">
      <AlertDialogHeader>
        <AlertDialogTitle>Select Account</AlertDialogTitle>
        <AlertDialogDescription
          >Please select an account to continue.</AlertDialogDescription
        >
      </AlertDialogHeader>
      <form class="space-y-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="accountId">
          <FormItem>
            <Select v-bind="componentField">
              <!-- :model-value="selectValue"
            @update:model-value="(value) => setSelectValue(value)"
            :disabled="isLoading" -->
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
              </FormControl>

              <SelectContent class="z-[100]">
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
      </form>

      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">Cancel</AlertDialogCancel>
        <AlertDialogAction :disabled="isLoading" @click="onSubmit">
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
