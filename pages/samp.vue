<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <h1 class="text-lg font-semibold text-gray-900">Profile</h1>
          </div>
          <NuxtLink to="/edit" class="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit Profile
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Subtitle -->
      <p class="text-gray-600 mb-8">Manage your personal information and track your progress</p>

      <!-- Profile Card -->
      <div class="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div class="flex items-start space-x-6">
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <!-- Profile Info -->
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-semibold text-gray-900 mb-1">{{ profile.name }}</h2>
            <p class="text-gray-600 mb-4">{{ profile.title }}</p>
            
            <!-- Contact Info -->
            <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {{ profile.email?'Your email':profile.email }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                {{ profile.phone?'XXXXXX':profile.phone }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ profile.location?"moon":profile.location }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Information Section -->
      <div class="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div class="flex items-center mb-6">
          <svg class="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
        </div>
        
        <div class="space-y-6">
          <div>
            <h4 class="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wide">BIO</h4>
            <p class="text-gray-700 leading-relaxed">{{ profile.bio?'Your bio bro':profile.bio }}</p>
          </div>
          
          <div>
            <h4 class="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wide">LINKEDIN</h4>
            <a :href="`https://${profile.linkedin}`" target="_blank" class="text-blue-600 hover:text-blue-800 transition-colors">
              {{ profile.linkedin?'Your linkedin Profile':profile.linkedin }}
            </a>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div class="text-3xl font-bold text-gray-900 mb-2">{{ stats.applicationsSent }}</div>
          <div class="text-sm text-gray-600">Applications Sent</div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ stats.interviews }}</div>
          <div class="text-sm text-gray-600">Interviews</div>
        </div>
        
        <div class="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.offersReceived }}</div>
          <div class="text-sm text-gray-600">Offers Received</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
 middleware: 'auth'
})

const editMode = ref(false)

let profile = ref({
  name: 'John Doe',
  title: 'Software Engineer',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Experienced in React, Node.js, and cloud technologies.',
  linkedin: 'linkedin.com/in/johndoe'
})

const stats = reactive({
  applicationsSent: 12,
  interviews: 5,
  offersReceived: 2
})
onMounted(async () => {
    profile.value = await useProfileStore().fetchProfile();
})
</script>