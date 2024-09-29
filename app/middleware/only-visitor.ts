export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { authUser } = storeToRefs(authStore);

  if (authUser.value?.user) return "/";
});
