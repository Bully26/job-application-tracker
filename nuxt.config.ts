export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Job Application Tracker',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Track and manage your job applications efficiently' }
      ]
    }
  },
  runtimeConfig:{
     public: {
    supabaseUrl: 'https://ntivdvypionkmsbhvain.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aXZkdnlwaW9ua21zYmh2YWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDM5OTQsImV4cCI6MjA2NTI3OTk5NH0.QOFvbhb57TAN443g5L-Vorql_YA-8bENqz_3z3URz-4'
  }
  }
 
})