<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <!-- Modal Content -->
    <div
      class="bg-white p-6 rounded-xl shadow-xl min-w-[300px] max-w-md w-full relative"
      @click.stop
    >
      <slot />
      <div class="mt-4 text-right">
        <button @click="$emit('close')" class="px-4 py-2 bg-blue-600 text-white rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['show']);
defineEmits(['close']);
</script>
