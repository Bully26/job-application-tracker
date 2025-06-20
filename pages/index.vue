<template>
  <div>
    <introAppHeader />
    <main>
      <introHeroSection />
      <introStatsSection />
      <introFeaturesSection />
      <introBenefitsSection />
      <introCTASection />
    </main>
    <introAppFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
})
useSeoMeta({
  title: 'JobTracker - Land Your Dream Job with Smart Application Tracking',
  ogTitle: 'JobTracker - Land Your Dream Job with Smart Application Tracking',
  description: 'Organize your resumes, track applications, and monitor your job search progress all in one powerful platform. Join thousands of professionals who\'ve streamlined their career journey.',
  ogDescription: 'Organize your resumes, track applications, and monitor your job search progress all in one powerful platform.',
  twitterCard: 'summary_large_image',
})
</script>