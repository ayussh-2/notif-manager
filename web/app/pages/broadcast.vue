<template >
  <div class="min-h-screen bg-base-200 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Broadcast Notifications</h1>
        <button @click="handleLogout" class="btn btn-ghost btn-sm">
          Logout
        </button>
      </div>

      <!-- Notification Form Card -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-xl mb-4">Send Push Notification</h2>

          <form @submit.prevent="handleSendNotification">
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text font-semibold">Notification Title</span>
              </label>
              <input
                v-model="notificationTitle"
                type="text"
                placeholder="Enter notification title"
                class="input input-bordered w-full"
                required
              />
            </div>

            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text font-semibold">Message Body</span>
              </label>
              <textarea
                v-model="notificationBody"
                placeholder="Enter your message here..."
                class="textarea textarea-bordered w-full h-32"
                required
              ></textarea>
            </div>

            <div v-if="successMessage" class="alert alert-success mb-4">
              <Icon name="heroicons:check-circle" class="h-6 w-6 shrink-0" />
              <span>{{ successMessage }}</span>
            </div>

            <div v-if="errorMessage" class="alert alert-error mb-4">
              <Icon name="heroicons:x-circle" class="h-6 w-6 shrink-0" />
              <span>{{ errorMessage }}</span>
            </div>

            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-accent w-full"
                :disabled="isSending"
              >
                <span v-if="isSending" class="loading loading-spinner"></span>
                {{ isSending ? 'Sending...' : 'Send Broadcast' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Info Card -->
      <div class="alert alert-info mt-6">
        <Icon name="heroicons:information-circle" class="h-6 w-6 shrink-0" />
        <span>This notification will be sent to all users subscribed to the 'all_users' topic.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


const notificationTitle = ref('');
const notificationBody = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const isSending = ref(false);

const { user, logout } = useAuth();
const router = useRouter();

const handleSendNotification = async () => {
  successMessage.value = '';
  errorMessage.value = '';
  isSending.value = true;

  try {
    const response = await $fetch('/api/send-notification', {
      method: 'POST',
      body: {
        title: notificationTitle.value,
        body: notificationBody.value,
        userId: user.value?.uid,
        userEmail: user.value?.email,
      },
    });

    successMessage.value = 'Notification sent successfully!';
    notificationTitle.value = '';
    notificationBody.value = '';
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Failed to send notification. Please try again.';
  } finally {
    isSending.value = false;
  }
};

const handleLogout = async () => {
  await logout();
  await router.push('/login');
};
</script>
