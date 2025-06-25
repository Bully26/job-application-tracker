<template>
  <section class="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-20 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-4xl mx-auto">
        <div class="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
          <span class="mr-2">🚀</span>
          Track Your Career Journey
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight mb-6 animate-slide-up">
          Land Your Dream Job with{' '}
          <span class="text-primary-600">Smart Application Tracking</span>
        </h1>
        
        <p class="text-lg sm:text-xl text-secondary-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
          Organize your resumes, track applications, and monitor your job search progress all in one 
          powerful platform. Join thousands of professionals who've streamlined their career journey.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <NuxtLink
            to="/signup"
            class="btn-primary"
          >
            Start Free Today
            <ArrowRight class="ml-2 h-5 w-5" />
          </NuxtLink>
          
          <button class="btn-secondary">
            <Play class="mr-2 h-5 w-5" />
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Play } from 'lucide-vue-next'
</script>