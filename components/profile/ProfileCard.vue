<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
    <div class="flex items-start space-x-6">
      <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
        <UserIcon class="w-12 h-12 text-gray-600" />
      </div>
      <div class="flex-1">
        <ProfileView 
          v-if="!editMode" 
          :profile="profile" 
        />
        <ProfileEdit 
          v-else 
          :profile="profile" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/outline'
import ProfileView from './ProfileView.vue'
import ProfileEdit from './ProfileEdit.vue'

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