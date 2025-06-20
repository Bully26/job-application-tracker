<template>
  <header class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div class="bg-secondary-900 text-white p-2 rounded-lg">
            <FileText class="h-5 w-5" />
          </div>
          <span class="text-xl font-bold text-secondary-900">JobTracker</span>
        </NuxtLink>

        <div v-if="showNavigation">
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-4">
            <NuxtLink
              to="/login"
              class="text-secondary-600 hover:text-secondary-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign In
            </NuxtLink>
            <NuxtLink
              to="/signup"
              class="bg-secondary-900 text-white hover:bg-secondary-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get Started
            </NuxtLink>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              @click="isMenuOpen = !isMenuOpen"
              class="text-secondary-600 hover:text-secondary-900 p-2"
            >
              <X v-if="isMenuOpen" class="h-6 w-6" />
              <Menu v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showNavigation && isMenuOpen" class="md:hidden py-4 space-y-2 border-t border-gray-100">
        <NuxtLink
          to="/login"
          class="block text-secondary-600 hover:text-secondary-900 px-3 py-2 rounded-md text-base font-medium transition-colors"
          @click="isMenuOpen = false"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="block bg-secondary-900 text-white hover:bg-secondary-800 px-3 py-2 rounded-lg text-base font-medium transition-colors text-center"
          @click="isMenuOpen = false"
        >
          Get Started
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { FileText, Menu, X } from 'lucide-vue-next'

defineProps({
  showNavigation: {
    type: Boolean,
    default: true
  }
})

const isMenuOpen = ref(false)
</script>