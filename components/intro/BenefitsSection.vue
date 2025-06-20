<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Why Choose JobTracker?
        </h2>
      </div>

      <!-- Benefits List -->
      <div class="max-w-3xl mx-auto space-y-6">
        <div v-for="benefit in benefits" :key="benefit.text" class="flex items-start space-x-4">
          <div class="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <p class="text-lg text-gray-700">{{ benefit.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const benefits = [
  { text: 'Organize multiple resume versions and track their performance' },
  { text: 'Monitor application status from submission to offer' },
  { text: 'Set goals and visualize your progress with detailed analytics' },
  { text: 'Never miss a follow-up with automated reminders' },
  { text: 'Access your data anywhere with cloud synchronization' }
]
</script>