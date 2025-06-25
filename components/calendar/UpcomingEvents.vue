<template>
  <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
      <div class="space-y-3">
        <div 
          v-for="event in events" 
          :key="event.id"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center">
            <div 
              class="w-3 h-3 rounded-full mr-3"
              :class="getEventColor(event.type)"
            ></div>
            <div>
              <div class="font-medium text-gray-900">{{ event.title }}</div>
              <div class="text-sm text-gray-500">{{ event.company }} • {{ formatEventDate(event.date) }}</div>
            </div>
          </div>
          <div class="flex space-x-2">
            <button 
              @click="$emit('edit', event)"
              class="text-gray-400 hover:text-gray-600"
            >
              <PencilIcon class="w-4 h-4" />
            </button>
            <button 
              @click="$emit('delete', event)"
              class="text-gray-400 hover:text-red-600"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
  events: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const getEventColor = (type) => {
  const colors = {
    interview: 'bg-blue-500',
    deadline: 'bg-red-500',
    followup: 'bg-yellow-500',
    meeting: 'bg-green-500'
  }
  return colors[type] || 'bg-gray-500'
}

const formatEventDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}
</script>