export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  if (user.value) return navigateTo("/");
});
