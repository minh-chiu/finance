<script setup lang="ts">
import { useForm } from "vee-validate";
import { LoginSchema } from "~/validations/auth.validation";

definePageMeta({ layout: "auth", middleware: "only-visitor" });

const route = useRoute();
const router = useRouter();

const goToSignUp = (query: Record<string, any> = {}) => {
  return router.push({ path: "/sign-up", query });
};

const goToResetPassword = (query: Record<string, any> = {}) => {
  return router.push({ path: "/reset-password", query });
};
const authStore = useAuthStore();
const { loading, user } = storeToRefs(authStore);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: LoginSchema,
});

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values);
});

watch(user, () => {
  if (user.value) return navigateTo("/");
});
</script>

<template>
  <div class="w-full space-y-8">
    <!-- Heading -->
    <AuthHeading
      title="Sign In"
      description="Your Social Campaigns"
      class="text-center"
    />

    <!-- Login with Social -->
    <AuthSocialLogin />

    <!-- Separator -->
    <Separator label="Or" />

    <!-- Form -->
    <form class="space-y-4 md:space-y-6" @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="authKey"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              class="py-5 opacity-90 md:py-6 md:text-sm"
              type="text"
              placeholder="Email or Phone"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="opacity-85" />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="password"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              class="py-5 opacity-90 md:py-6 md:text-sm"
              type="password"
              placeholder="Password"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="opacity-85" />

          <div class="text-end">
            <Button
              type="button"
              variant="link"
              class="font-normal text-primary md:text-sm"
              @click="goToResetPassword(route.query)"
            >
              Forgot Password ?
            </Button>
          </div>
        </FormItem>
      </FormField>

      <div class="flex w-full flex-row items-center py-2">
        <Button
          type="submit"
          class="user-select-none w-full py-5"
          :disabled="loading"
        >
          <Icon
            v-if="loading"
            name="lucide:loader"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Sign In
        </Button>
      </div>
    </form>

    <!-- Sign up navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 font-medium md:text-sm"
    >
      <span class="text-gray-400">Not a Member yet? </span>
      <Button
        type="button"
        variant="link"
        class="px-0 text-primary transition hover:underline hover:opacity-90"
        @click="goToSignUp(route.query)"
      >
        Sign up
      </Button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
