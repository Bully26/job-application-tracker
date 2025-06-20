<template>
  <span 
    class="status-badge"
    :class="getStatusClass(status)"
  >
    {{ status }}
  </span>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    required: true
  }
})

const getStatusClass = (status) => {
  const statusMap = {
    'Applied': 'status-applied',
    'Interview': 'status-interview',
    'Offered': 'status-offered',
    'Rejected': 'status-rejected',
    'Waiting': 'status-waiting',
    'Not Applied': 'status-not-applied'
  }
  return statusMap[status] || 'status-not-applied'
}
</script>