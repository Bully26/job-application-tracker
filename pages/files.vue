<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <div class="flex items-center mb-2">
          <FolderIcon class="w-6 h-6 text-gray-600 mr-3" />
          <h1 class="text-2xl font-bold text-gray-900">Files</h1>
        </div>
        <p class="text-gray-600">Manage your documents and attachments</p>
      </div>
      <button 
        @click="showUploadModal = true"
        class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
      >
        <ArrowUpTrayIcon class="w-4 h-4 mr-2" />
        Upload File
      </button>
    </div>

    <!-- File Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="file in files" 
        :key="file.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <DocumentIcon class="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 class="font-medium text-gray-900 text-sm">{{ file.name }}</h3>
              <p class="text-xs text-gray-500">{{ file.size }}</p>
            </div>
          </div>
          <div class="flex space-x-1">
            <button class="text-gray-400 hover:text-gray-600 p-1">
              <ArrowDownTrayIcon class="w-4 h-4" />
            </button>
            <button class="text-gray-400 hover:text-red-600 p-1">
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="text-xs text-gray-500">
          Uploaded {{ formatDate(file.uploadedAt) }}
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="files.length === 0" class="text-center py-12">
      <FolderIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No files yet</h3>
      <p class="text-gray-500 mb-4">Upload your documents and keep them organized.</p>
      <button 
        @click="showUploadModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Upload Your First File
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  FolderIcon, 
  DocumentIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

const showUploadModal = ref(false)

const files = ref([
  {
    id: 1,
    name: 'Cover Letter - Google.pdf',
    size: '245 KB',
    uploadedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Portfolio Screenshots.zip',
    size: '1.2 MB',
    uploadedAt: new Date('2024-01-10')
  },
  {
    id: 3,
    name: 'Interview Questions.docx',
    size: '87 KB',
    uploadedAt: new Date('2024-01-08')
  }
])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}
</script>