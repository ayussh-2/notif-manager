<script setup lang="ts">
const { user, loading } = useAuth();

// Redirect based on auth state
watchEffect(() => {
  if (!loading.value) {
    if (user.value) {
      navigateTo('/broadcast');
    } else {
      navigateTo('/login');
    }
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="loading loading-spinner loading-lg"></div>
  </div>
</template>
