<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto overflow-y-scroll">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stage
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              URL
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resume
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
          <Draggable v-model="applications" item-key="id" class="drag-area w-full" @end="onDragEnd" tag="tbody" v-auto-animate>
            <template #item="{ element }">
              <ApplicationRow :key="element.id" :application="element" />
            </template>
          </Draggable>
      </table>


    </div>
  </div>
</template>
<script setup>
import ApplicationRow from './ApplicationRow.vue'
import Draggable from 'vuedraggable'

const { applications } = storeToRefs(useJobStore());
const samp = ref({ ...applications });

const items = ref([
  { id: 1, name: '🍎 Apple' },
  { id: 2, name: '🍌 Banana' },
  { id: 3, name: '🍇 Grape' },
  { id: 4, name: '🍑 Peach' }
])


defineEmits(['edit', 'delete'])
</script>