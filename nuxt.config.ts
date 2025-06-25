export default defineNuxtConfig({
  compatibilityDate: '2025-06-23',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@nuxt/icon','@formkit/auto-animate/nuxt'],
  css: ['./assets/css/tailwind.css'],
  app: {
    head: {
      title: 'Job Application Tracker',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
   supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
    login: '/login',
    callback: '/confirm',
    include: undefined,
    exclude: ['/signup','/','/current'],
    saveRedirectToCookie: false,
  }
   
  },
 
})