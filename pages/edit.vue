<template>
  <div class="min-h-screen bg-gray-50 py-8 text-2xl">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Edit Profile Form -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div class="flex items-center mb-8">
          <svg class="w-6 h-6 mr-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <h1 class="text-2xl font-bold text-gray-900">Edit Profile</h1>
        </div>

        <!-- Form Fields -->
        <form @submit.prevent="saveChanges" class="space-y-6">
          <div class="w-[70%]">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                id="fullName"
                v-model="form.name"
                type="text"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="form-input"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="location" class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                id="location"
                v-model="form.location"
                type="text"
                class="form-input"
                required
              />
            </div>
            <div>
              <label for="linkedin" class="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
              <input
                id="linkedin"
                v-model="form.linkedin"
                type="url"
                class="form-input"
                placeholder="linkedin.com/in/username"
              />
            </div>
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              id="bio"
              v-model="form.description"
              rows="4"
              class="form-textarea"
              placeholder="Tell us about yourself..."
            ></textarea>
          
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
            <NuxtLink to="/profile" class="btn-secondary text-center">Cancel</NuxtLink>
            <button @click="saveres" class="btn-success">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const curprof = ref('');
const form = reactive({
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  description: ''
})

onMounted(async () => {
  const profile = await useProfileStore().fetchProfile();
  curprof.value = profile;

  // populate the form after curprof gets data
  form.name = curprof.value.name || 'your name';
  form.status = curprof.value.status || 'your title';
  form.email = curprof.value.email || 'your email';
  form.phone = curprof.value.phone || 'your phone';
  form.location = curprof.value.location || 'your location';
  form.linkedin = curprof.value.links?.linkedin || 'your linkedin';
  form.description = curprof.value.bio || 'your bio';
});


const saveres = async () => {
  try {
    const temp = { ...form }; // clone to avoid reactive issues
    await useProfileStore().saveProfile(temp);
    await useProfileStore().fetchProfile(true);
    navigateTo('/profile');
  } catch (err) {
    console.error('Error saving profile:', err);
  }
};


</script>
<style scoped>
.stat-card {
  background-color: white;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  border: 1px solid #e5e7eb; /* border-gray-200 */
  padding: 1.5rem; /* p-6 */
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: scale(1.05);
}

.btn-primary {
  background-color: #3b82f6; /* bg-primary-500 (Tailwind blue-500) */
  color: white;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #2563eb; /* bg-primary-600 (Tailwind blue-600) */
}

.btn-secondary {
  background-color: white;
  color: #374151; /* text-gray-700 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-secondary:hover {
  background-color: #f9fafb; /* hover:bg-gray-50 */
}

.btn-success {
  background-color: #3080e9; /* green-500 */
  color: white;
  padding: 0.5rem 1.5rem; /* py-2 px-6 */
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-success:hover {
  background-color: #1816a3; /* green-600 */
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem; /* py-2 px-3 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 2px #3b82f6; /* focus:ring-primary-500 */
}

.form-textarea {
  resize: none;
}
</style>
