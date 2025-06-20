<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Your Resumes</h3>
      <div class="space-y-4">
        <ResumeItem
          v-for="resume in resumes"
          :key="resume.id"
          :resume="resume"
          @save-name="$emit('save-name', $event)"
          @edit-name="$emit('edit-name', $event)"
          @download="$emit('download', $event)"
          @preview="$emit('preview', $event)"
          @delete="$emit('delete', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ResumeItem from './ResumeItem.vue'

defineProps({
  resumes: {
    type: Array,
    required: true
  }
})

defineEmits(['save-name', 'edit-name', 'download', 'preview', 'delete'])
</script>