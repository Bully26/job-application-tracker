<template>
  <div 
    class="note-card"
    @click="$emit('select', note)"
  >
    <div class="flex items-start justify-between mb-3">
      <h3 class="font-semibold text-gray-900 flex-1">{{ note.title }}</h3>
      <div class="flex space-x-1">
        <button 
          @click.stop="$emit('edit', note)"
          class="text-gray-400 hover:text-gray-600"
        >
          <PencilIcon class="w-4 h-4" />
        </button>
        <button 
          @click.stop="$emit('delete', note.id)"
          class="text-gray-400 hover:text-red-600"
        >
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
    <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ note.content }}</p>
    <div class="flex flex-wrap gap-2 mb-3">
      <span 
        v-for="tag in note.tags" 
        :key="tag"
        class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
      >
        {{ tag }}
      </span>
    </div>
    <div class="text-xs text-gray-500">
      Updated {{ formatDate(note.updatedAt) }}
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
  note: {
    type: Object,
    required: true
  }
})

defineEmits(['select', 'edit', 'delete'])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}
</script>