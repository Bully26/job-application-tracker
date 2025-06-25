<template>
  <div class="container">
    <h1>🧲 Drag & Drop Example</h1>
    {{items}}

    <Draggable
      v-model="items"
      item-key="id"
      class="drag-area"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div class="item">
          {{ element.name }}
        </div>
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Draggable from 'vuedraggable'

const items = ref([
  { id: 1, name: '🍎 Apple' },
  { id: 2, name: '🍌 Banana' },
  { id: 3, name: '🍇 Grape' },
  { id: 4, name: '🍑 Peach' }
])

const onDragEnd = () => {
  console.log('New order:', items.value.map(i => i.name))
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.drag-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.item {
  padding: 14px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 18px;
  cursor: grab;
  transition: background-color 0.2s;
}

.item:hover {
  background-color: #eee;
}
</style>
