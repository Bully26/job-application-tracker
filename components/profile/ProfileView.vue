<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900">{{ profile.name }}</h2>
    <p class="text-gray-600 mb-4">{{ profile.title }}</p>
    <div class="flex items-center space-x-6 text-sm text-gray-500">
      <div class="flex items-center">
        <EnvelopeIcon class="w-4 h-4 mr-1" />
        {{ profile.email }}
      </div>
      <div class="flex items-center">
        <PhoneIcon class="w-4 h-4 mr-1" />
        {{ profile.phone }}
      </div>
      <div class="flex items-center">
        <MapPinIcon class="w-4 h-4 mr-1" />
        {{ profile.location }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'

defineProps({
  profile: {
    type: Object,
    required: true
  }
})
</script>