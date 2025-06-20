<template>
  <div>
    <!-- Header -->
    <PageHeader
      title="Resume Management"
      description="Manage your resumes and track their performance"
      :icon="DocumentIcon"
    >
      <template #actions>
        <div class="flex space-x-3">
          <button 
            @click="showUploadModal = true"
            class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowUpTrayIcon class="w-4 h-4 mr-2" />
            Upload Resume
          </button>
         
        </div>
      </template>
    </PageHeader>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard 
        :value="stats.totalResumes" 
        label="Total Resumes" 
      />
      <StatCard 
        :value="stats.totalDownloads" 
        label="Total Downloads" 
        value-class="text-green-600" 
      />
      <StatCard 
        :value="stats.primaryResume" 
        label="Primary Resume" 
        value-class="text-blue-600" 
      />
      <StatCard 
        :value="stats.variants" 
        label="Variants" 
        value-class="text-orange-600" 
      />
    </div>

    <!-- Resume List -->
    <ResumeList
      :resumes="resumes"
      @save-name="saveResumeName"
      @edit-name="editResumeName"
      @download="downloadResume"
      @preview="previewResume"
      @delete="deleteResume"
    />

    <!-- Resume Tips -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Resume Tips</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Content Tips:</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Tailor your resume for each job application
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use action verbs and quantify achievements
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Keep it concise (1-2 pages max)
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Include relevant keywords from job descriptions
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 mb-3">Formatting Tips:</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use a clean, professional layout
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Ensure consistent formatting throughout
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Save as PDF to preserve formatting
              </li>
              <li class="flex items-start">
                <span class="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use readable fonts (10-12pt size)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { DocumentIcon, PlusIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import StatCard from '~/components/ui/StatCard.vue'
import ResumeList from '~/components/resume/ResumeList.vue'

const showUploadModal = ref(false)
const showCreateModal = ref(false)

const stats = reactive({
  totalResumes: 3,
  totalDownloads: 35,
  primaryResume: 1,
  variants: 2
})

const resumes = ref([
  {
    id: 1,
    name: 'Software Engineer Resume - General',
    isPrimary: true,
    variant: false,
    modifiedAt: new Date('2024-01-15'),
    size: '245 KB',
    downloads: 12,
    editing: false
  },
  {
    id: 2,
    name: 'Frontend Developer Resume - React',
    isPrimary: false,
    variant: true,
    modifiedAt: new Date('2024-01-10'),
    size: '238 KB',
    downloads: 8,
    editing: false
  },
  {
    id: 3,
    name: 'Full Stack Developer Resume',
    isPrimary: false,
    variant: true,
    modifiedAt: new Date('2024-01-05'),
    size: '251 KB',
    downloads: 15,
    editing: false
  }
])

const editResumeName = (resume) => {
  resume.editing = true
  nextTick(() => {
    const input = document.querySelector(`input[data-resume-id="${resume.id}"]`)
    if (input) input.focus()
  })
}

const saveResumeName = (resume) => {
  resume.editing = false
  console.log('Saving resume name:', resume.name)
}

const downloadResume = (resume) => {
  console.log('Download resume:', resume)
}

const previewResume = (resume) => {
  console.log('Preview resume:', resume)
}

const deleteResume = (resume) => {
  if (confirm('Are you sure you want to delete this resume?')) {
    resumes.value = resumes.value.filter(r => r.id !== resume.id)
  }
}
</script>