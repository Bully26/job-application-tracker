<template>
  <footer class="bg-secondary-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div class="flex justify-center items-center space-x-2 mb-4">
          <div class="bg-white text-secondary-900 p-2 rounded-lg">
            <FileText class="h-5 w-5" />
          </div>
          <span class="text-xl font-bold">JobTracker</span>
        </div>
        <p class="text-secondary-300 mb-8">
          Streamline your career journey with smart application tracking
        </p>
        <div class="flex justify-center space-x-6">
          <NuxtLink to="/privacy" class="text-secondary-300 hover:text-white transition-colors">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms" class="text-secondary-300 hover:text-white transition-colors">
            Terms of Service
          </NuxtLink>
          <NuxtLink to="/contact" class="text-secondary-300 hover:text-white transition-colors">
            Contact
          </NuxtLink>
        </div>
        <div class="mt-8 pt-8 border-t border-secondary-800">
          <p class="text-secondary-400 text-sm">
            © 2025 JobTracker. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FileText } from 'lucide-vue-next'
</script>