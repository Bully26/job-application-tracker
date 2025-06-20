<template>
  <div class="stat-card">
    <div class="text-3xl font-bold" :class="valueClass">{{ value }}</div>
    <div class="text-sm text-gray-500">{{ label }}</div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  valueClass: {
    type: String,
    default: 'text-gray-900'
  }
})
</script>