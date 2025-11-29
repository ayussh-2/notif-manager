<script setup lang="ts">
const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  await router.push('/login');
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-200">
    <NuxtLink to="/broadcast" class="link link-primary text-xl">
      Send Notifications
    </NuxtLink>
    
    <button @click="handleLogout" class="btn btn-sm btn-ghost">
      Logout
    </button>
  </div>
</template>
