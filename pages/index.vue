<template>
  <div>
    <NuxtLink 
      to="/profile" 
      class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Get Started
    </NuxtLink>
  </div>
</template>

<script setup>
// Redirect to profile page
await navigateTo('/profile')
</script>