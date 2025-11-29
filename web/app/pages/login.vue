<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold text-center justify-center mb-4">
          Admin Login
        </h2>
        
        <form @submit.prevent="handleLogin">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div v-if="errorMessage" class="alert alert-error mb-4">
            <Icon name="heroicons:x-circle" class="h-6 w-6 shrink-0" />
            <span>{{ errorMessage }}</span>
          </div>

          <div class="form-control mt-6">
            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="loading loading-spinner"></span>
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const { login } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  try {
    const result = await login(email.value, password.value);
    
    if (result.success) {
      await router.push('/broadcast');
    } else {
      errorMessage.value = result.error || 'Invalid credentials. Please try again.';
    }
  } catch (error: any) {
    errorMessage.value = 'An unexpected error occurred. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>
