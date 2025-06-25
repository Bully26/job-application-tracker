<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Calendar Header -->
    <div class="grid grid-cols-7 gap-px bg-gray-200">
      <div 
        v-for="day in weekDays" 
        :key="day"
        class="bg-gray-50 py-2 px-3 text-center text-sm font-medium text-gray-500"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Body -->
    <div class="grid grid-cols-7 gap-px bg-gray-200">
      <CalendarDay
        v-for="date in calendarDates"
        :key="date.dateString"
        :date="date"
        :events="getEventsForDate(date)"
        @select="$emit('select-date', date)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CalendarDay from './CalendarDay.vue'

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select-date'])

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarDates = computed(() => {
  const year = props.currentDate.getFullYear()
  const month = props.currentDate.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  const dates = []
  const today = new Date()
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    
    dates.push({
      date: date,
      day: date.getDate(),
      dateString: date.toISOString().split('T')[0],
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString()
    })
  }
  
  return dates
})

const getEventsForDate = (date) => {
  return props.events.filter(event => 
    event.date.toDateString() === date.date.toDateString()
  )
}
</script>