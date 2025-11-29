export default defineNuxtRouteMiddleware(async (to) => {
  const { user, loading } = useAuth();

  if (import.meta.server && loading.value) {
    return navigateTo('/login');
  }

  if (loading.value) {
    await new Promise<void>((resolve) => {
      const unwatch = watch(loading, (newLoading) => {
        if (!newLoading) {
          unwatch();
          resolve();
        }
      });
    });
  }


  if (user.value && to.path === '/login') {
    return navigateTo('/');
  }

  if (to.path === '/login') {
    return;
  }

  if (!user.value) {
    return navigateTo('/login');
  }
});
