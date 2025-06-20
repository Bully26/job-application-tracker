<template>
  <section class="bg-gray-900 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <div class="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
            {{ stat.value }}
          </div>
          <div class="text-gray-300 font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Applications Tracked' },
  { value: '85%', label: 'Success Rate' },
  { value: '24/7', label: 'Support' }
]
</script>