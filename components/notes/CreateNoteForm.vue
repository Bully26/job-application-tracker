<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Create New Note</h3>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <div>
          <input
            v-model="form.title"
            type="text"
            placeholder="Note title..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
        </div>
        <div>
          <textarea
            v-model="form.content"
            placeholder="Write your note content here..."
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          ></textarea>
        </div>
        <div>
          <input
            v-model="form.tags"
            type="text"
            placeholder="Tags (comma separated)..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
        </div>
        <div class="flex space-x-3">
          <button
            type="submit"
            class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Save Note
          </button>
          <button
            type="button"
            @click="$emit('cancel')"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  title: '',
  content: '',
  tags: ''
})

const emit = defineEmits(['create', 'cancel'])

const handleSubmit = () => {
  const note = {
    title: form.title,
    content: form.content,
    tags: form.tags ? form.tags.split(',').map(tag => tag.trim()) : []
  }
  
  emit('create', note)
  
  // Reset form
  form.title = ''
  form.content = ''
  form.tags = ''
}
</script>