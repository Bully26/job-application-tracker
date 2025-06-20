<template>
  <section class="bg-secondary-900 py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center animate-fade-in"
        >
          <div class="flex justify-center mb-4">
            <component :is="stat.icon" :class="`h-8 w-8 ${stat.color}`" />
          </div>
          <div class="text-3xl sm:text-4xl font-bold text-white mb-2">
            {{ stat.number }}
          </div>
          <div class="text-secondary-300 text-sm sm:text-base font-medium">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Users, Target, TrendingUp, Clock } from 'lucide-vue-next'

const stats = [
  {
    number: '10K+',
    label: 'Active Users',
    icon: Users,
    color: 'text-primary-600',
  },
  {
    number: '50K+',
    label: 'Applications Tracked',
    icon: Target,
    color: 'text-green-600',
  },
  {
    number: '85%',
    label: 'Success Rate',
    icon: TrendingUp,
    color: 'text-blue-600',
  },
  {
    number: '24/7',
    label: 'Support',
    icon: Clock,
    color: 'text-purple-600',
  },
]
</script>