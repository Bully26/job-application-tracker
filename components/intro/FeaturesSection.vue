<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Everything You Need to Succeed
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our comprehensive platform provides all the tools you need to organize, 
          track, and optimize your job search process.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div v-for="feature in features" :key="feature.title" class="card p-8">
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <component :is="feature.icon" class="w-6 h-6 text-blue-600"/>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

const DocumentIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', {
    fillRule: 'evenodd',
    d: 'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z',
    clipRule: 'evenodd'
  })
])

const ChartIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', {
    d: 'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'
  })
])

const features = [
  {
    title: 'Resume Management',
    description: 'Upload, organize, and track multiple resume versions for different job applications and industries.',
    icon: DocumentIcon
  },
  {
    title: 'Application Tracking',
    description: 'Monitor your job applications and their status in real-time from submission to offer.',
    icon: ChartIcon
  }
]
</script>