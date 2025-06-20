<template>
  <section class="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 bg-primary-50 text-blue-600 rounded-full text-sm font-medium mb-8">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          Track Your Career Journey
        </div>

        <!-- Main Heading -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Land Your Dream Job with
          <span class="text-blue-600 block">Smart Application Tracking</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Organize your resumes, track applications, and monitor your job search progress all in one
          powerful platform. Join thousands of professionals who've streamlined their career journey.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink to="/signup" class="btn-primary inline-flex items-center text-lg px-8 py-4">
            Start Free Today
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </NuxtLink>
          <button class="btn-secondary text-lg px-8 py-4">
            Watch Demo
          </button>
        </div>
      </div>
    </div>
  </section>
</template>