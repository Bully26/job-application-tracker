<template>
  <div>
    <!-- Header -->
    <PageHeader title="Your Applications" description="Track and manage your job applications"
      :icon="ClipboardDocumentListIcon">
      <template #actions>
        <button @click="showModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <PlusIcon class="w-4 h-4 mr-2" />
          Add Application
        </button>
      </template>
    </PageHeader>
     
    <Model v-model="showModal" @limit="setlimit" />
     <div class="w-full text-red-500 my-3 text-xl text-center font-semibold" v-if="limitapp">
       Upgrade your plan to upload more application.
     </div>
    <!-- Search -->
    <div class="mb-6">
      <SearchInput v-model="searchQuery" placeholder="Search applications..." />
    </div>

    <!-- Applications Table -->
    
    <ApplicationsTable v-if="!searchQuery" />
    <ApplicationsTableSearch v-if="searchQuery" :keyword="searchQuery" />


    <!-- Summary -->
    <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
      <div>Showing {{ filteredApplications.length }} applications</div>

      <div class="flex flex-wrap gap-3">
        <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-1">
          <span class="text-red-400 font-medium">Not Applied:</span>
          <span class="text-red-600 font-semibold">{{ getStatusCount('not_applied') }}</span>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-1">
          <span class="text-green-400 font-medium">Applied:</span>
          <span class="text-green-600 font-semibold">{{ getStatusCount('applied') }}</span>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-1">
          <span class="text-blue-400 font-medium">Interview:</span>
          <span class="text-blue-600 font-semibold">{{ getStatusCount('interview') }}</span>
        </div>
        <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-1">
          <span class="text-green-400 font-medium">Offered:</span>
          <span class="text-green-600 font-semibold">{{ getStatusCount('offered') }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ClipboardDocumentListIcon, PlusIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import ApplicationsTable from '~/components/applications/ApplicationsTable.vue'
import ApplicationsTableSearch from '~/components/applications/ApplicationTableSearch.vue'
import Model from '~/components/applications/Modeladd.vue'

const showAddModal = ref(false)
const searchQuery = ref('')
const showModal = ref(false);


const { applications } = storeToRefs(useJobStore());
const limitapp= ref(false);

const filteredApplications = computed(() => {
  if (!searchQuery.value) return applications.value
  return applications.value.filter(app =>
    app.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    app.position.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(async () => {
  await useJobStore().fetchApplications();

})



const getStatusCount = (status) => {
  return applications.value.filter(app => app.stage === status).length
}

const editApplication = (application) => {
  console.log('Edit application:', application)
}
const setlimit =()=>{
  limitapp.value=true;
}

const deleteApplication = (id) => {
  if (confirm('Are you sure you want to delete this application?')) {
    applications.value = applications.value.filter(app => app.id !== id)
  }
}
</script>