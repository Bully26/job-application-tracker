<template>
  <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45.855a2.5 2.5 0 10-3.9 0 .5.5 0 00.4.8h3.1a.5.5 0 00.4-.8z" clip-rule="evenodd"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">JobTracker</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/login" class="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            Sign In
          </NuxtLink>
          <NuxtLink to="/signup" class="btn-primary">
            Get Started
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-100">
        <div class="flex flex-col space-y-4">
          <NuxtLink to="/login" class="text-gray-600 hover:text-gray-900 font-medium">
            Sign In
          </NuxtLink>
          <NuxtLink to="/signup" class="btn-primary inline-block text-center">
            Get Started
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const mobileMenuOpen = ref(false)
</script>