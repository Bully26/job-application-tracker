<template>
  <div class="flex items-center justify-between mb-8">
    <div>
      <div class="flex items-center mb-2">
        <component :is="icon" class="w-6 h-6 text-gray-600 mr-3" />
        <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
      </div>
      <p class="text-gray-600">{{ description }}</p>
    </div>
    <slot name="actions" />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  }
})
</script>