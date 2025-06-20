<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative">
      <input
        :type="inputType"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :class="[
          'form-input',
          error ? 'form-input-error' : ''
        ]"
      />
      <button
        v-if="showPasswordToggle"
        type="button"
        @click="showPassword = !showPassword"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <EyeOff v-if="showPassword" class="h-5 w-5 text-gray-400" />
        <Eye v-else class="h-5 w-5 text-gray-400" />
      </button>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="helpText" class="mt-1 text-sm text-gray-500">{{ helpText }}</p>
  </div>
</template>

<script setup>
import { Eye, EyeOff } from 'lucide-vue-next'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  showPasswordToggle: {
    type: Boolean,
    default: false
  },
  helpText: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.showPasswordToggle && showPassword.value) {
    return 'text'
  }
  return props.type
})
</script>