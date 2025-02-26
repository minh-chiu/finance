export default defineNuxtRouteMiddleware((to) => {
  const { user } = storeToRefs(useAuthStore());
  if (!user.value) {
    return useRouter().push({
      query: { goto: to.fullPath },
    });
  }
});
