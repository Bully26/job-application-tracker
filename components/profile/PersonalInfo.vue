<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <UserIcon class="w-5 h-5 mr-2" />
      Personal Information
    </h3>
    <div v-if="!editMode">
      <p class="text-gray-700 mb-4">{{ profile.bio }}</p>
      <div class="text-sm text-gray-500">
        <strong>LinkedIn:</strong> {{ profile.linkedin }}
      </div>
    </div>
    <div v-else>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Bio</label>
          <textarea 
            v-model="profile.bio" 
            rows="4" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input 
            v-model="profile.linkedin" 
            type="url" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/outline'

defineProps({
  profile: {
    type: Object,
    required: true
  },
  editMode: {
    type: Boolean,
    default: false
  }
})
</script>