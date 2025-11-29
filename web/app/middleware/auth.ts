export default defineNuxtRouteMiddleware((to, from) => {
  const { user, loading } = useAuth();

  // Wait for auth state to be initialized
  if (loading.value) {
    return;
  }

  // If user is not authenticated, redirect to login
  if (!user.value) {
    return navigateTo('/login');
  }
});
