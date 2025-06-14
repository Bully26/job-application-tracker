<template>
  <div class="p-6 relative">
    <button @click="isDialogOpen = true" class="px-4 py-2 bg-green-600 text-white rounded">
      Open Modal
    </button>


    <div class="mt-6 bg-gray-100 p-4 rounded">
      <p>This is a normal component.</p>
      <input type="text" placeholder="Try typing here" class="mt-2 p-2 border rounded w-full" />
    </div>

  
    <BaseDialog :show="isDialogOpen" @close="isDialogOpen = false">
      <h2 class="text-xl font-bold">Modal Active</h2>
      <p class="mt-2">This dialog blocks all background interaction.</p>
    </BaseDialog>
  </div>
</template>

<script setup>


const isDialogOpen = ref(false);
</script>
