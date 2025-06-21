<template>
  <div>
    <!-- Header -->
    <PageHeader
      title="Profile"
      description="Manage your personal information and track your progress"
      :icon="ClipboardDocumentListIcon"
    >
      <template #actions>
        <button 
          @click="editMode = !editMode"
          class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
        >
          <PencilIcon class="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </template>
    </PageHeader>

    <!-- Profile Card -->
    <ProfileCard 
      :profile="profile" 
      :edit-mode="editMode" 
    />

    <!-- Personal Information -->
    <PersonalInfo 
      :profile="profile" 
      :edit-mode="editMode" 
    />

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        :value="stats.applicationsSent" 
        label="Applications Sent" 
      />
      <StatCard 
        :value="stats.interviews" 
        label="Interviews" 
        value-class="text-blue-600" 
      />
      <StatCard 
        :value="stats.offersReceived" 
        label="Offers Received" 
        value-class="text-green-600" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ClipboardDocumentListIcon, PencilIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatCard from '~/components/ui/StatCard.vue'
import ProfileCard from '~/components/profile/ProfileCard.vue'
import PersonalInfo from '~/components/profile/PersonalInfo.vue'

definePageMeta({
 middleware: 'auth'
})

const editMode = ref(false)

const profile = reactive({
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
</script>