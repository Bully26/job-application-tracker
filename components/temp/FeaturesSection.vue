<template>
  <section class="py-16 sm:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
          Everything You Need to Succeed
        </h2>
        <p class="text-lg text-secondary-600 max-w-3xl mx-auto">
          Our comprehensive platform provides all the tools you need to organize, 
          track, and optimize your job search process.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 animate-fade-in"
        >
          <div :class="`inline-flex p-3 rounded-lg ${feature.bgColor} mb-6`">
            <component :is="feature.icon" :class="`h-6 w-6 ${feature.color}`" />
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-secondary-900 mb-4">
            {{ feature.title }}
          </h3>
          <p class="text-secondary-600 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { FileText, TrendingUp, Target, BarChart3 } from 'lucide-vue-next'

const features = [
  {
    icon: FileText,
    title: 'Resume Management',
    description: 'Upload, organize, and track multiple resume versions for different job opportunities and career paths.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    icon: TrendingUp,
    title: 'Application Tracking',
    description: 'Monitor your job applications and their status in real-time with detailed progress tracking and analytics.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Target,
    title: 'Career Goals',
    description: 'Set and monitor career goals with actionable insights to help you achieve your professional objectives.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Get application insights and analytics to optimize your job search strategy and improve success rates.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
]
</script>