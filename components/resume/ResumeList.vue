<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8" @click="some">
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Your Resumes</h3>
      <div class="space-y-4">
        <ResumeItem
          v-for="resume in dresume"
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

onMounted(async () => {
  await useResumeStore().getResume()
})

const dresume=computed(()=>{
  return useResumeStore().resume;
})



defineEmits(['save-name', 'edit-name', 'download', 'preview', 'delete'])
</script>