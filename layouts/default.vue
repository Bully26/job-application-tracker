<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <button
        @click="sidebarOpen = !sidebarOpen"
        class="bg-gray-800 text-white p-2 rounded-lg shadow-lg"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <div 
      class="fixed inset-y-0 left-0 z-40 w-64 bg-slate-50 border-r-2 transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div class="flex items-center px-6 py-4 border-b border-gray-700">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class=" font-bold text-sm text-black">JAT</span>
          </div>
          <div class="ml-3">
            <h1 class=" font-semibold text-sm text-black">JOB APPLICATION</h1>
            <p class=" text-xs text-black">TRACKER</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="mt-8">
        <NuxtLink 
          to="/profile" 
          class="sidebar-item"
          :class="{ active: $route.path === '/profile' }"
        >
          <UserIcon class="w-5 h-5 mr-3" />
          Profile
        </NuxtLink>
        
        <NuxtLink 
          to="/applications" 
          class="sidebar-item"
          :class="{ active: $route.path === '/applications' }"
        >
          <ClipboardDocumentListIcon class="w-5 h-5 mr-3" />
          View
        </NuxtLink>
        
        <NuxtLink 
          to="/files" 
          class="sidebar-item"
          :class="{ active: $route.path === '/files' }"
        >
          <FolderIcon class="w-5 h-5 mr-3" />
          Files
        </NuxtLink>
        
        <NuxtLink 
          to="/notes" 
          class="sidebar-item"
          :class="{ active: $route.path === '/notes' }"
        >
          <DocumentTextIcon class="w-5 h-5 mr-3" />
          Notes
        </NuxtLink>
        
        <NuxtLink 
          to="/resume" 
          class="sidebar-item"
          :class="{ active: $route.path === '/resume' }"
        >
          <DocumentIcon class="w-5 h-5 mr-3" />
          Resume
        </NuxtLink>
        
        <NuxtLink 
          to="/calendar" 
          class="sidebar-item"
          :class="{ active: $route.path === '/calendar' }"
        >
          <CalendarIcon class="w-5 h-5 mr-3" />
          Calendar
        </NuxtLink>
      </nav>
    </div>

    <!-- Mobile overlay -->
    <div 
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    ></div>

    <!-- Main content -->
    <div class="lg:ml-64">
      <main class="p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  UserIcon, 
  ClipboardDocumentListIcon, 
  FolderIcon, 
  DocumentTextIcon, 
  DocumentIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

const sidebarOpen = ref(false)
</script>