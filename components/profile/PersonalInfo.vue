<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <UserIcon class="w-5 h-5 mr-2" />
      Personal Information
    </h3>
    <div >
      <p class="text-gray-700 mb-4">{{ props.profile.bio }}</p>
      <div class="text-sm text-gray-500">
        <strong>LinkedIn:</strong> {{ props.profile.linkedin }}
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})
</script>