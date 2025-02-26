<script setup lang="ts">
const firebaseAuth = useFirebaseAuth();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const router = useRouter();

const goToQueryFrom = (from?: string) => {
  if (!from) return router.push({ path: "/" });

  const [path = "", queryString = {}] = (from as string).split("?");

  router.push({
    path: `/${path.replace("/", "")}`,
    query: Object.fromEntries(new URLSearchParams(queryString)),
  });
};

const loginWithGoogle = async (e: MouseEvent) => {
  const idToken = await firebaseAuth.loginWithGoogle(e);

  await authStore.loginWithGoogle(idToken);

  const query = useRoute().query;
  if (user.value) goToQueryFrom(query?.goto as string);
};
</script>

<template>
  <div class="flex flex-col gap-x-3 gap-y-3 md:flex-row">
    <Button
      variant="outline"
      class="w-full py-5 text-center text-[13px] text-gray-600 hover:text-primary dark:text-gray-300 md:text-sm"
      @click="loginWithGoogle"
    >
      <Icon name="flat-color-icons:google" size="15" class="mr-2" />
      Sign in with Google
    </Button>

    <Button
      variant="outline"
      class="w-full py-5 text-center text-[13px] text-gray-600 hover:text-primary dark:text-gray-300 md:text-sm"
      disabled
    >
      <Icon name="logos:apple" size="15" class="mr-2" />

      Sign in with Apple
    </Button>
  </div>
</template>

<style lang="scss" scoped></style>
