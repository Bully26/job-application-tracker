<template>
  <div>
    <!-- Header -->
    <PageHeader
      title="Your Applications"
      description="Track and manage your job applications"
      :icon="ClipboardDocumentListIcon"
    >
      <template #actions>
        <button 
          @click="showAddModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          Add Application
        </button>
      </template>
    </PageHeader>

    <!-- Search -->
    <div class="mb-6">
      <SearchInput 
        v-model="searchQuery" 
        placeholder="Search applications..." 
      />
    </div>

    <!-- Applications Table -->
    <ApplicationsTable
      :applications="filteredApplications"
      @edit="editApplication"
      @delete="deleteApplication"
    />

    <!-- Summary -->
    <div class="mt-6 flex items-center justify-between text-sm text-gray-500">
      <div>Showing {{ filteredApplications.length }} applications</div>
      <div class="flex space-x-4">
        <span>Applied: {{ getStatusCount('Applied') }}</span>
        <span>Interview: {{ getStatusCount('Interview') }}</span>
        <span>Offered: {{ getStatusCount('Offered') }}</span>
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

const showAddModal = ref(false)
const searchQuery = ref('')

const applications = ref([
  {
    id: 1,
    company: 'Apple',
    stage: 'Not Applied',
    position: 'Staff Product Manager',
    deadline: new Date('2025-01-13'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  },
  {
    id: 2,
    company: 'Google',
    stage: 'Applied',
    position: 'Senior Product Manager',
    deadline: new Date('2025-01-07'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  },
  {
    id: 3,
    company: 'Cisco',
    stage: 'Interview',
    position: 'Senior Product Manager',
    deadline: new Date('2025-01-13'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  },
  {
    id: 4,
    company: 'Netflix',
    stage: 'Rejected',
    position: 'Senior Product Manager',
    deadline: new Date('2025-01-13'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  },
  {
    id: 5,
    company: 'Microsoft',
    stage: 'Rejected',
    position: 'Product Manager',
    deadline: new Date('2025-01-09'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  },
  {
    id: 6,
    company: 'Datadog',
    stage: 'Offered',
    position: 'Staff Product Manager',
    deadline: new Date('2025-01-05'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  },
  {
    id: 7,
    company: 'Samsara',
    stage: 'Interview',
    position: 'Product Manager',
    deadline: new Date('2025-01-04'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  },
  {
    id: 8,
    company: 'Databricks',
    stage: 'Waiting',
    position: 'Senior Product Manager',
    deadline: new Date('2025-01-07'),
    url: 'https://linkedin.com',
    resume: 'Resume Template'
  }
])

const filteredApplications = computed(() => {
  if (!searchQuery.value) return applications.value
  return applications.value.filter(app => 
    app.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    app.position.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getStatusCount = (status) => {
  return applications.value.filter(app => app.stage === status).length
}

const editApplication = (application) => {
  console.log('Edit application:', application)
}

const deleteApplication = (id) => {
  if (confirm('Are you sure you want to delete this application?')) {
    applications.value = applications.value.filter(app => app.id !== id)
  }
}
</script>