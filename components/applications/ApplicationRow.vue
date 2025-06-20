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
        target="_blank"
        class="text-blue-600 hover:text-blue-800 flex items-center"
      >
        {{ getDomain(application.url) }}
        <ArrowTopRightOnSquareIcon class="w-3 h-3 ml-1" />
      </a>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-gray-500">
      {{ application.resume }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div class="flex space-x-2">
        <button 
          @click="$emit('edit')"
          class="text-blue-600 hover:text-blue-800"
        >
          <PencilIcon class="w-4 h-4" />
        </button>
        <button 
          @click="$emit('delete')"
          class="text-red-600 hover:text-red-800"
        >
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import StatusBadge from '../ui/StatusBadge.vue'

defineProps({
  application: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

const getDomain = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}
</script>