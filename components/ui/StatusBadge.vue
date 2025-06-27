<template>
  <span 
    class="status-badge"
    :class="getStatusClass(status)"
  >
    {{  status.charAt(0).toUpperCase() + status.slice(1) }}
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
    'accepted': 'status-accepted',
    'applied': 'status-applied',
    'interview': 'status-interview',
    'no chance': 'status-no-chance',
    'not_applied': 'status-not-applied',
    'offer': 'status-offer',
    'rejected': 'status-rejected',
    'waiting': 'status-waiting',
    'withdrawn': 'status-withdrawn',
  }
  return statusMap[status] || 'status-not-applied'
}

</script>