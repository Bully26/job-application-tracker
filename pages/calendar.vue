<template>
  <div>
    <!-- Header -->
    <PageHeader
      title="Calendar"
      description="Schedule and track your interviews and deadlines"
      :icon="CalendarIcon"
    >
      <template #actions>
        <button 
          @click="showAddEventModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          Add Event
        </button>
      </template>
    </PageHeader>

    <!-- Calendar Navigation -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <button 
          @click="previousMonth"
          class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <h2 class="text-xl font-semibold text-gray-900">
          {{ currentMonthYear }}
        </h2>
        <button 
          @click="nextMonth"
          class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </div>
      <div class="flex space-x-2">
        <button 
          @click="viewMode = 'month'"
          class="px-3 py-2 text-sm rounded-lg transition-colors"
          :class="viewMode === 'month' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'"
        >
          Month
        </button>
        <button 
          @click="viewMode = 'week'"
          class="px-3 py-2 text-sm rounded-lg transition-colors"
          :class="viewMode === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'"
        >
          Week
        </button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <CalendarGrid
      :current-date="currentDate"
      :events="events"
      @select-date="selectDate"
    />

    <!-- Upcoming Events -->
    <UpcomingEvents
      :events="upcomingEvents"
      @edit="editEvent"
      @delete="deleteEvent"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import PageHeader from '~/components/ui/PageHeader.vue'
import CalendarGrid from '~/components/calendar/CalendarGrid.vue'
import UpcomingEvents from '~/components/calendar/UpcomingEvents.vue'

const showAddEventModal = ref(false)
const viewMode = ref('month')
const currentDate = ref(new Date())

const events = ref([
  {
    id: 1,
    title: 'Google Interview',
    company: 'Google',
    type: 'interview',
    date: new Date('2025-01-15'),
    time: '10:00 AM'
  },
  {
    id: 2,
    title: 'Apple Application Deadline',
    company: 'Apple',
    type: 'deadline',
    date: new Date('2025-01-20'),
    time: '11:59 PM'
  },
  {
    id: 3,
    title: 'Netflix Follow-up',
    company: 'Netflix',
    type: 'followup',
    date: new Date('2025-01-18'),
    time: '2:00 PM'
  },
  {
    id: 4,
    title: 'Microsoft Technical Interview',
    company: 'Microsoft',
    type: 'interview',
    date: new Date('2025-01-22'),
    time: '3:00 PM'
  }
])

const currentMonthYear = computed(() => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(currentDate.value)
})

const upcomingEvents = computed(() => {
  const today = new Date()
  return events.value
    .filter(event => event.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, 5)
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (date) => {
  console.log('Selected date:', date)
}

const editEvent = (event) => {
  console.log('Edit event:', event)
}

const deleteEvent = (event) => {
  if (confirm('Are you sure you want to delete this event?')) {
    events.value = events.value.filter(e => e.id !== event.id)
  }
}
</script>