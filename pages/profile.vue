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
          class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          @click="navigateTo('/edit')"
        >
          <PencilIcon class="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </template>
    </PageHeader>

    <!-- Profile Card -->
    <ProfileCard 
      :profile="profile" 
      v-if="profile"
 
    />

    <!-- Personal Information -->
    <PersonalInfo 
      :profile="profile" 
       v-if="profile"
     
    />

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        :value="statappsent" 
        label="Applications Sent" 
      />
      <StatCard 
        :value="statint" 
        label="Interviews" 
        value-class="text-blue-600" 
      />
      <StatCard 
        :value="statappoff" 
        label="Offers Received" 
        value-class="text-green-600" 
      />
    </div>
  </div>
</template>

<script setup>
import { ClipboardDocumentListIcon, PencilIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatCard from '~/components/ui/StatCard.vue'
import ProfileCard from '~/components/profile/ProfileCard.vue'
import PersonalInfo from '~/components/profile/PersonalInfo.vue'

definePageMeta({
 middleware: 'auth'
})


const stats = reactive({
  applicationsSent: 12,
  interviews: 5,
  offersReceived: 2
})

const resume = useJobStore();
const { applications } = storeToRefs(resume); 

const statappsent = computed(() => {
  return applications.value?.length || 0;
});

const statint = computed(() => {
  return applications.value?.filter(app => app.stage === 'interview').length || 0;
});

const statappoff = computed(() => {
  return applications.value?.filter(app => app.stage === 'offer').length || 0;
});



const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);
onMounted(async () => {
  await profileStore.fetchProfile();
  await resume.fetchApplications();
})

</script>