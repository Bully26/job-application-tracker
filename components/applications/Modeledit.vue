<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
        @click="closeModal">
        <!-- Modal Content -->
        <Transition name="modal-content" class="opacity-100">
          <div v-if="isOpen"
            class="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto z-10 max-h-[90vh] overflow-y-auto"
            @click.stop>
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">Edit Application</h2>
              <button @click="closeModal" class="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close modal">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <form @submit.prevent="calledit" class="p-6 space-y-6">
              <!-- Company and Position Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                    Company <span class="text-red-500">*</span>
                  </label>
                  <input id="company" v-model="formData.company" type="text" required placeholder="Enter company name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" />
                </div>
                <div>
                  <label for="position" class="block text-sm font-medium text-gray-700 mb-2">
                    Position <span class="text-red-500">*</span>
                  </label>
                  <input id="position" v-model="formData.position" type="text" required
                    placeholder="Enter position title"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" />
                </div>
              </div>

              <!-- Stage and Deadline Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="stage" class="block text-sm font-medium text-gray-700 mb-2">
                    Stage
                  </label>
                  <select id="stage" v-model="formData.stage"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                    <option value="accepted">Accepted</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="no chance">No Chance</option>
                    <option value="not_applied">Not Applied</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="waiting">Waiting</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                </div>
                <div>
                  <label for="deadline" class="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <input id="deadline" v-model="formData.deadline" type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" />
                </div>
              </div>

              <!-- Application URL -->
              <div>
                <label for="applicationUrl" class="block text-sm font-medium text-gray-700 mb-2">
                  Application URL
                </label>
                <input id="applicationUrl" v-model="formData.url" type="url" placeholder="https://..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" />
              </div>

              <!-- Resume Version -->
              <div>
                <label for="resumeVersion" class="block text-sm font-medium text-gray-700 mb-2">
                  Resume Url
                </label>
                <input id="resumeVersion" v-model="formData.resume" type="url" placeholder="Resume template name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" />
              </div>

              <!-- Form Actions -->
              <div class="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button type="button" @click="closeModal"
                  class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                  Cancel
                </button>
                <button type="submit" @click="calledit"
                  class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { data } from 'autoprefixer'
import { ref, reactive, watch, onUnmounted } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  editdata: {
    type: JSON,
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'submit'])

// Reactive state
const isOpen = ref(props.modelValue)
const formData = reactive({
  company: props.editdata.company,
  position: props.editdata.position,
  stage: props.editdata.stage,
  deadline: props.editdata.deadline,
  url: props.editdata.url,
  resume: props.editdata.resume
})

// Watch for prop changes
watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
})



// Watch for local changes
watch(isOpen, (newVal) => {
  emit('update:modelValue', newVal)
})

// Methods
const closeModal = () => {
  isOpen.value = false
}

const calledit = async () => {
  await useJobStore().editjob(formData, props.editdata);
  closeModal()
}

const resetForm = () => {
  formData.company = ''
  formData.position = ''
  formData.stage = 'not_applied'
  formData.deadline = ''
  formData.url = ''
  formData.resume = ''
}

onMounted(() => {


})

// const handleSubmit = async () => {
//   // Validate required fields
//   if (!formData.company.trim() || !formData.position.trim()) {
//     alert('Please fill in all required fields.')
//     return
//   }

//   // adding the form to supa base data base
//   await useJobStore().addjob({
//     company: formData.company,
//     position: formData.position,
//     stage: formData.stage,
//     deadline: formData.deadline
//       ? new Date(formData.deadline).toISOString()
//       : null,
//     url: formData.url,
//     resume: formData.resume,
//   });
//   // await useJobStore().fetchApplications();

//   // Reset form and close modal
//   resetForm()
//   closeModal()
// }

// Handle escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

// Add/remove event listeners
watch(isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'auto'
  }
})

watch(
  () => props.editdata,
  (newData) => {
    if (newData && Object.keys(newData).length > 0) {
      formData.company = newData.company || ''
      formData.position = newData.position || ''
      formData.stage = newData.stage || 'not_applied'
      formData.deadline = newData.deadline
        ? new Date(newData.deadline).toISOString().split('T')[0]
        : ''
      formData.url = newData.url || ''
      formData.resume = newData.resume || ''
    }
  },
  { immediate: true, deep: true }
)



// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto'
})
</script>
