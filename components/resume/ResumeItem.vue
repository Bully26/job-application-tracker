<template>
  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
    <div class="flex items-center">
      <DocumentIcon class="w-8 h-8 text-gray-400 mr-4" />
      <div>
        <div class="flex items-center">
          <span 
            v-if="!resume.editing" 
            class="font-medium text-gray-900 mr-2"
          >
            {{ resume.name }}
          </span>
          <input 
            v-if="resume.editing"
            v-model="resume.name"
            @blur="$emit('save-name', resume)"
            @keyup.enter="$emit('save-name', resume)"
            class="font-medium text-gray-900 mr-2 border-0 outline-none bg-transparent focus:bg-white focus:border focus:border-blue-500 focus:rounded px-2 py-1"
            :class="{ 'bg-blue-50 border border-blue-300 rounded px-2 py-1': resume.editing }"
          >
          <button 
            v-if="!resume.editing"
            @click="$emit('edit-name', resume)"
            class="text-gray-400 hover:text-gray-600 p-1"
          >
            <PencilIcon class="w-4 h-4" />
          </button>
          <span 
            v-if="resume.isPrimary"
            class="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium"
          >
            Primary
          </span>
          <span 
            v-if="resume.variant"
            class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium ml-2"
          >
            Variant
          </span>
        </div>
        <div class="text-sm text-gray-500">
          CreatedAt : {{formatDate(resume.created_at)}} 
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button 
        @click="download"
        class="text-gray-400 hover:text-gray-600 p-2"
      >
        <ArrowDownTrayIcon class="w-4 h-4" />
      </button>
      <button 
        @click="seefile"
        class="text-gray-400 hover:text-gray-600 p-2"
      >
        <EyeIcon class="w-4 h-4" />
      </button>
      <button 
        @click="deletefile"
        class="text-gray-400 hover:text-red-600 p-2"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { DocumentIcon, PencilIcon, ArrowDownTrayIcon, EyeIcon, TrashIcon } from '@heroicons/vue/24/outline'

const { resume } = defineProps({
  resume: {
    type: Object,
    required: true
  }
})

const seefile = async ()=>{
  const url = await useResumeStore().getfileUrl(resume.name);
  navigateTo(url,{external:true});
}

const download = async ()=>{
   alert('download initated!!,'+resume.name)
   await useResumeStore().downloadFile(resume.name);
}

const deletefile = async()=>{
  alert('deletion initated');
  await useResumeStore().deleteResume(resume.name);
  await useResumeStore().getResume(true);

  
}

function formatDate(isoString) {
  const date = new Date(isoString)
  const day = date.getUTCDate()
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
  const year = date.getUTCFullYear()

  return `${day} ${month} ${year}`
}




</script>