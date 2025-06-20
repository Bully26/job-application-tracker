<template>
  <section class="py-16 sm:py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
          What Our Users Say
        </h2>
        <p class="text-lg text-secondary-600">
          Join thousands of professionals who have transformed their job search
        </p>
      </div>
      
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl p-8 sm:p-12 shadow-lg">
          <div class="flex justify-center mb-6">
            <Quote class="h-12 w-12 text-primary-600" />
          </div>
          
          <blockquote class="text-lg sm:text-xl text-secondary-700 text-center mb-8 leading-relaxed">
            "JobTracker helped me organize my applications and track my progress. 
            I landed my dream job within 3 months!"
          </blockquote>
          
          <div class="flex justify-center mb-6">
            <div class="flex space-x-1">
              <Star
                v-for="i in 5"
                :key="i"
                class="h-5 w-5 text-yellow-400 fill-current"
              />
            </div>
          </div>
          
          <div class="text-center">
            <div class="inline-flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-primary-600 font-bold text-lg">SL</span>
              </div>
              <div class="text-left">
                <p class="font-semibold text-secondary-900">Sarah Lee</p>
                <p class="text-secondary-600 text-sm">Software Engineer at Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Star, Quote } from 'lucide-vue-next'
</script>