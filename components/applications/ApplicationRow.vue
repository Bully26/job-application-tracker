<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="font-medium text-gray-900">{{ application.company }}</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <StatusBadge :status="application.stage" />
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-gray-900">
      {{ application.position }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-gray-500">
      {{ formatDate(application.deadline) }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <a 
        :href="application.url" 
         v-if="application.url"
        target="_blank"
        class="text-blue-600 hover:text-blue-800 flex items-center"
      >
        {{ getDomain(application.url) }}
        <ArrowTopRightOnSquareIcon class="w-3 h-3 ml-1" />
      </a>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-gray-500 over">
       <a 
        v-if="application.resume"
        :href="application.resume" 
        target="_blank"
        class="text-blue-600 hover:text-blue-800 flex items-center"
      >
        {{ getDomain(application.resume) }}
        <ArrowTopRightOnSquareIcon class="w-3 h-3 ml-1" />
      </a>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div class="flex space-x-2">
        <button 
          
          class="text-blue-600 hover:text-blue-800"
        >
          <PencilIcon class="w-4 h-4" @click="$emit('edit',application)" />
        </button>
        <button 
          @click="del"
          class="text-red-600 hover:text-red-800"
        >
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
 
</template>
<!-- <template>
  <li class="hover:bg-gray-50 transition-colors grid grid-cols-7 gap-4 px-6 py-4 items-center">
    <div class="font-medium text-gray-900">
      {{ application.company }}
    </div>
    <div>
      <StatusBadge :status="application.stage" />
    </div>
    <div class="text-gray-900">
      {{ application.position }}
    </div>
    <div class="text-gray-500">
      {{ formatDate(application.deadline) }}
    </div>
    <div>
      <a 
        :href="application.url" 
        target="_blank"
        class="text-blue-600 hover:text-blue-800 flex items-center"
      >
        {{ getDomain(application.url) }}
        <ArrowTopRightOnSquareIcon class="w-3 h-3 ml-1" />
      </a>
    </div>
    <div class="text-gray-500">
      <a 
        v-if="application.resume"
        :href="application.resume" 
        target="_blank"
        class="text-blue-600 hover:text-blue-800 flex items-center"
      >
        {{ getDomain(application.resume) }}
        <ArrowTopRightOnSquareIcon class="w-3 h-3 ml-1" />
      </a>
    </div>
    <div class="text-sm font-medium flex space-x-2">
      <button 
        @click=""
        class="text-blue-600 hover:text-blue-800"
      >
        <PencilIcon class="w-4 h-4" />
      </button>
      <button 
        @click="del"
        class="text-red-600 hover:text-red-800"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
  </li>
</template> -->


<script setup>
import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import StatusBadge from '../ui/StatusBadge.vue'

import { Edit } from 'lucide-vue-next'

const props = defineProps({
  application: {
    type: Object,
    required: true
  }
})

defineEmits(['edit'])

const formatDate = (date) => {
  const formatted = new Date(date).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
return formatted
}

async function del(){
  await useJobStore().deletejob(props.application.company,props.application.position);
}

const getDomain = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}
</script>